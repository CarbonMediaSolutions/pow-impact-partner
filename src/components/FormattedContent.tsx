 import React from 'react';
 
 interface FormattedContentProps {
   content: string[];
   className?: string;
 }
 
 // Unicode bold character ranges
 const UNICODE_BOLD_RANGES = [
   { start: 0x1D400, end: 0x1D419 }, // Mathematical Bold Capital
   { start: 0x1D41A, end: 0x1D433 }, // Mathematical Bold Small
   { start: 0x1D5D4, end: 0x1D5ED }, // Mathematical Sans-Serif Bold Capital
   { start: 0x1D5EE, end: 0x1D607 }, // Mathematical Sans-Serif Bold Small
 ];
 
 const isUnicodeBold = (char: string): boolean => {
   const codePoint = char.codePointAt(0);
   if (!codePoint) return false;
   return UNICODE_BOLD_RANGES.some(range => codePoint >= range.start && codePoint <= range.end);
 };
 
 const containsUnicodeBold = (text: string): boolean => {
   for (const char of text) {
     if (isUnicodeBold(char)) return true;
   }
   return false;
 };
 
 // Convert unicode bold to regular text
 const normalizeUnicodeBold = (text: string): string => {
   let result = '';
   for (const char of text) {
     const codePoint = char.codePointAt(0);
     if (!codePoint) {
       result += char;
       continue;
     }
     
     // Mathematical Bold Capital A-Z (𝐀-𝐙)
     if (codePoint >= 0x1D400 && codePoint <= 0x1D419) {
       result += String.fromCharCode(65 + (codePoint - 0x1D400));
     }
     // Mathematical Bold Small a-z (𝐚-𝐳)
     else if (codePoint >= 0x1D41A && codePoint <= 0x1D433) {
       result += String.fromCharCode(97 + (codePoint - 0x1D41A));
     }
     // Mathematical Sans-Serif Bold Capital A-Z
     else if (codePoint >= 0x1D5D4 && codePoint <= 0x1D5ED) {
       result += String.fromCharCode(65 + (codePoint - 0x1D5D4));
     }
     // Mathematical Sans-Serif Bold Small a-z
     else if (codePoint >= 0x1D5EE && codePoint <= 0x1D607) {
       result += String.fromCharCode(97 + (codePoint - 0x1D5EE));
     }
     else {
       result += char;
     }
   }
   return result;
 };
 
 // Extract unicode bold segments and wrap in strong tags
 const processUnicodeBold = (text: string): React.ReactNode[] => {
   const result: React.ReactNode[] = [];
   let currentSegment = '';
   let inBold = false;
   let boldSegment = '';
   
   for (const char of text) {
     const isBold = isUnicodeBold(char);
     
     if (isBold && !inBold) {
       // Starting bold segment
       if (currentSegment) {
         result.push(currentSegment);
         currentSegment = '';
       }
       inBold = true;
       boldSegment = normalizeUnicodeBold(char);
     } else if (isBold && inBold) {
       // Continuing bold segment
       boldSegment += normalizeUnicodeBold(char);
     } else if (!isBold && inBold) {
       // Ending bold segment
       result.push(<strong key={`bold-${result.length}`}>{boldSegment}</strong>);
       boldSegment = '';
       inBold = false;
       currentSegment = char;
     } else {
       // Regular character
       currentSegment += char;
     }
   }
   
   // Flush remaining
   if (inBold && boldSegment) {
     result.push(<strong key={`bold-${result.length}`}>{boldSegment}</strong>);
   } else if (currentSegment) {
     result.push(currentSegment);
   }
   
   return result;
 };
 
 // Format text with bold markers and hashtags
 const formatText = (text: string): React.ReactNode => {
   // First handle unicode bold characters
   if (containsUnicodeBold(text)) {
     return processUnicodeBold(text);
   }
   
   // Handle **bold** markdown syntax
   const boldPattern = /(\*\*[^*]+\*\*)/g;
   const parts = text.split(boldPattern);
   
   const formatted = parts.map((part, i) => {
     if (part.startsWith('**') && part.endsWith('**')) {
       return <strong key={i}>{part.slice(2, -2)}</strong>;
     }
     return part;
   });
   
   // Handle hashtag# pattern (LinkedIn style)
   return formatted.map((part, i) => {
     if (typeof part === 'string' && part.includes('hashtag#')) {
       return part.replace(/hashtag#(\w+)/g, '#$1');
     }
     return part;
   });
 };
 
 export const FormattedContent: React.FC<FormattedContentProps> = ({ content, className = '' }) => {
   const elements: React.ReactNode[] = [];
   let currentList: string[] = [];
   let listCounter = 0;
   
   const flushList = () => {
     if (currentList.length > 0) {
       elements.push(
         <ul key={`list-${listCounter++}`} className="list-disc pl-6 space-y-2 my-4">
           {currentList.map((item, i) => (
             <li key={i} className="text-foreground/90">{formatText(item)}</li>
           ))}
         </ul>
       );
       currentList = [];
     }
   };
   
   content.forEach((line, index) => {
     // Check if line is a bullet point (●, •, -, *, or numbered)
     const bulletMatch = line.match(/^[●•\-\*]\s*(.+)$/);
     
     if (bulletMatch) {
       currentList.push(bulletMatch[1]);
     } else {
       flushList();
       
       // Check for blockquote (starts and ends with quotes)
       if ((line.startsWith('"') && line.endsWith('"')) || 
           (line.startsWith('"') && line.endsWith('"')) ||
           (line.startsWith('\"') && line.includes('—'))) {
         elements.push(
           <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
             {formatText(line)}
           </blockquote>
         );
       }
       // Check for hashtag line (usually at end of LinkedIn posts)
       else if (line.startsWith('hashtag#') || line.startsWith('#')) {
         const tags = line.split(/\s+/).filter(t => t.startsWith('hashtag#') || t.startsWith('#'));
         elements.push(
           <div key={index} className="flex flex-wrap gap-2 my-4">
             {tags.map((tag, i) => (
               <span key={i} className="text-primary font-medium">
                 {tag.replace('hashtag#', '#')}
               </span>
             ))}
           </div>
         );
       }
       // Regular paragraph
       else if (line.trim()) {
         elements.push(
           <p key={index} className="mb-4 leading-relaxed">
             {formatText(line)}
           </p>
         );
       }
     }
   });
   
   // Don't forget to flush any remaining list items
   flushList();
   
   return <div className={className}>{elements}</div>;
 };
 
 export default FormattedContent;