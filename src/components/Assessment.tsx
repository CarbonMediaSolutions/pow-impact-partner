import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const questions = [
  {
    id: 1,
    question: 'What stage is your business at?',
    options: ['Early-stage (0-1 year)', 'Growing (1-3 years)', 'Scaling (3-7 years)', 'Established (7+ years)'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 2,
    question: "What's your annual revenue range?",
    options: ['Under £100k', '£100k - £500k', '£500k - £2M', '£2M+'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 3,
    question: 'How confident are you in your current tax strategy?',
    options: ['Very unsure - could be paying too much', 'Somewhat confident - but there might be optimization opportunities', 'Confident - but open to review', 'Very confident - regularly optimized'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 4,
    question: 'Are you operating as the right legal structure?',
    options: ['Not sure', 'Possibly', 'Fairly sure', 'Yes, recently reviewed'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 5,
    question: 'How clear is your financial picture right now?',
    options: ['I have limited visibility', 'I have basic visibility', 'I have good visibility', 'Real-time, clear visibility'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 6,
    question: 'Have you planned for growth in the next 12-24 months?',
    options: ['No, focused on current operations', 'Loosely, still figuring it out', 'Yes, but not financially planned', 'Yes, fully planned and funded'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 7,
    question: "What's your biggest current financial challenge?",
    options: ['Understanding tax obligations', 'Cash flow management', 'Scaling complexity', 'Regulatory compliance'],
    scores: [2, 2, 3, 2],
  },
  {
    id: 8,
    question: 'Do you have a dedicated finance person or outsource?',
    options: ['I handle it myself', 'I have a bookkeeper', 'I have an accountant', 'I have a full finance team'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 9,
    question: 'Is impact measurement important to your stakeholders?',
    options: ['No', 'Somewhat', 'Very important', 'Critical to our strategy'],
    scores: [1, 2, 3, 4],
  },
  {
    id: 10,
    question: 'How soon would you like to strengthen your financial position?',
    options: ['Not urgent', 'In the next 3-6 months', 'In the next 1-3 months', 'ASAP'],
    scores: [1, 2, 3, 4],
  },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  wantsReview: boolean;
}

export const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    wantsReview: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const totalQuestions = questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForm(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    let maxScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        total += q.scores[answers[q.id]];
      }
      maxScore += Math.max(...q.scores);
    });
    return ((total / maxScore) * 10).toFixed(1);
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 8) return { label: 'Excellent Foundation', color: 'text-emerald' };
    if (score >= 6) return { label: 'Good Foundation - Ready for Growth', color: 'text-primary' };
    if (score >= 4) return { label: 'Room for Improvement', color: 'text-secondary' };
    return { label: 'Needs Attention', color: 'text-destructive' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: 'Please fill in required fields',
        description: 'Name and email are required.',
        variant: 'destructive',
      });
      return;
    }
    setShowResults(true);
    setIsSubmitted(true);
    toast({
      title: 'Assessment submitted!',
      description: 'Check your email for your personalized results.',
    });
  };

  const score = parseFloat(calculateScore());
  const interpretation = getScoreInterpretation(score);

  if (showResults) {
    return (
      <section id="assessment" className="py-24 lg:py-32 bg-primary/5">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background rounded-3xl p-8 lg:p-12 shadow-xl border border-border"
          >
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-emerald mx-auto mb-4" />
              <h2 className="font-serif text-3xl font-semibold text-primary mb-2">
                Your Financial Health Score
              </h2>
              <p className="font-body text-muted-foreground">
                Thank you, {formData.name}! Here's your assessment.
              </p>
            </div>

            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-baseline gap-2">
                <span className="font-serif text-7xl font-bold text-primary">{score}</span>
                <span className="font-serif text-2xl text-muted-foreground">/10</span>
              </div>
              <p className={`font-body text-lg font-medium mt-2 ${interpretation.color}`}>
                {interpretation.label}
              </p>
            </div>

            {/* Score Bar */}
            <div className="mb-8">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score * 10}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-emerald rounded-full"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Top Recommendations
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">1</span>
                  </div>
                  <span className="font-body text-muted-foreground">
                    Review your current tax structure for optimization opportunities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">2</span>
                  </div>
                  <span className="font-body text-muted-foreground">
                    Implement real-time financial dashboards for better visibility
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">3</span>
                  </div>
                  <span className="font-body text-muted-foreground">
                    Create a financial roadmap aligned with your growth plans
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-emerald flex-1 py-6">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Consultation
              </Button>
              <Button variant="outline" className="btn-outline-primary flex-1 py-6">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
            </div>

            <p className="font-body text-sm text-muted-foreground text-center mt-6">
              Patric will review your results and reach out within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (showForm) {
    return (
      <section id="assessment" className="py-24 lg:py-32 bg-primary/5">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background rounded-3xl p-8 lg:p-12 shadow-xl border border-border"
          >
            <h2 className="font-serif text-2xl font-semibold text-primary mb-2 text-center">
              Almost there!
            </h2>
            <p className="font-body text-muted-foreground text-center mb-8">
              Enter your details to receive your personalized assessment.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="font-body"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="font-body"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-body">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Your company"
                    className="font-body"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+44..."
                    className="font-body"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="review"
                  checked={formData.wantsReview}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, wantsReview: checked as boolean }))
                  }
                />
                <Label htmlFor="review" className="font-body text-sm text-muted-foreground">
                  I'd like Patric to review my results personally
                </Label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button type="submit" className="btn-emerald flex-1 py-6">
                  Get My Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <section id="assessment" className="py-24 lg:py-32 bg-primary/5">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">Assess Your Financial Health</h2>
          <p className="section-subtitle mx-auto">
            Get instant insights into your business's financial strength. Takes 90 seconds.
          </p>
        </motion.div>

        <div className="bg-background rounded-3xl p-8 lg:p-12 shadow-xl border border-border">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-muted-foreground">
                Question {currentStep + 1} of {totalQuestions}
              </span>
              <span className="font-body text-sm text-primary font-medium">
                {Math.round(progress)}% complete
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif text-xl lg:text-2xl font-semibold text-primary mb-8">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, index)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 font-body ${
                      answers[currentQuestion.id] === index
                        ? 'border-emerald bg-emerald/10 text-foreground'
                        : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion.id] === index
                            ? 'border-emerald bg-emerald'
                            : 'border-border'
                        }`}
                      >
                        {answers[currentQuestion.id] === index && (
                          <span className="w-2 h-2 rounded-full bg-emerald-foreground" />
                        )}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1 py-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
              className="btn-emerald flex-1 py-6"
            >
              {currentStep === totalQuestions - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
