-- Remove the CHECK constraint on the topic column to allow custom topics
ALTER TABLE perspectives DROP CONSTRAINT IF EXISTS perspectives_topic_check;