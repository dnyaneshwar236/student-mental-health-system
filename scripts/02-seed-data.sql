-- Seed data for Mental Health Platform
-- This script populates the database with initial data

-- Insert sample counselors
INSERT INTO counselors (name, title, specializations, bio, available_hours, is_active) VALUES
(
    'Dr. Sarah Wilson',
    'Licensed Clinical Psychologist',
    ARRAY['Anxiety', 'Depression', 'Academic Stress'],
    'Dr. Wilson specializes in cognitive behavioral therapy and has over 10 years of experience working with college students.',
    '{"monday": ["09:00", "17:00"], "tuesday": ["09:00", "17:00"], "wednesday": ["09:00", "17:00"], "thursday": ["09:00", "17:00"], "friday": ["09:00", "15:00"]}',
    true
),
(
    'Dr. Michael Chen',
    'Licensed Professional Counselor',
    ARRAY['Stress Management', 'Mindfulness', 'Group Therapy'],
    'Dr. Chen focuses on mindfulness-based interventions and group therapy approaches for student mental health.',
    '{"monday": ["10:00", "18:00"], "tuesday": ["10:00", "18:00"], "wednesday": ["10:00", "18:00"], "thursday": ["10:00", "18:00"], "friday": ["10:00", "16:00"]}',
    true
),
(
    'Dr. Emily Rodriguez',
    'Clinical Social Worker',
    ARRAY['Crisis Intervention', 'Trauma', 'LGBTQ+ Support'],
    'Dr. Rodriguez specializes in crisis intervention and provides culturally sensitive care for diverse student populations.',
    '{"monday": ["08:00", "16:00"], "tuesday": ["08:00", "16:00"], "wednesday": ["08:00", "16:00"], "thursday": ["08:00", "16:00"], "friday": ["08:00", "14:00"]}',
    true
);

-- Insert sample resources
INSERT INTO resources (title, description, content, category, resource_type, tags, read_time_minutes, author, is_published) VALUES
(
    'Understanding Anxiety in College',
    'Learn about common anxiety triggers and coping strategies for college students.',
    'Anxiety is one of the most common mental health challenges faced by college students. This comprehensive guide covers the signs, symptoms, and evidence-based coping strategies...',
    'anxiety',
    'article',
    ARRAY['anxiety', 'coping', 'college', 'mental health'],
    5,
    'Dr. Sarah Wilson',
    true
),
(
    'Stress Management Techniques',
    'Practical techniques for managing academic and social stress.',
    'College life can be overwhelming with academic pressures, social challenges, and life transitions. This guide provides practical, research-backed techniques...',
    'stress',
    'guide',
    ARRAY['stress', 'management', 'techniques', 'academic'],
    8,
    'Dr. Michael Chen',
    true
),
(
    'Building Healthy Sleep Habits',
    'Tips for improving sleep quality and establishing healthy sleep routines.',
    'Sleep is crucial for mental health and academic performance. This article explores the science of sleep and provides actionable tips...',
    'wellness',
    'article',
    ARRAY['sleep', 'wellness', 'habits', 'health'],
    6,
    'Dr. Emily Rodriguez',
    true
),
(
    'Mindfulness Meditation for Beginners',
    'A gentle introduction to mindfulness meditation practices.',
    'Mindfulness meditation has been shown to reduce stress, improve focus, and enhance overall well-being. This beginner-friendly guide...',
    'mindfulness',
    'video',
    ARRAY['mindfulness', 'meditation', 'beginners', 'stress relief'],
    12,
    'Dr. Michael Chen',
    true
),
(
    'Recognizing Depression Symptoms',
    'Understanding the signs of depression and when to seek help.',
    'Depression can manifest differently in college students. This important resource helps identify symptoms and provides guidance on seeking support...',
    'depression',
    'article',
    ARRAY['depression', 'symptoms', 'help', 'mental health'],
    7,
    'Dr. Sarah Wilson',
    true
),
(
    'Crisis Resources and Emergency Contacts',
    'Essential crisis support information and emergency contacts.',
    'If you or someone you know is in crisis, immediate help is available. This resource provides 24/7 crisis hotlines, emergency contacts...',
    'crisis',
    'tool',
    ARRAY['crisis', 'emergency', 'support', 'hotlines'],
    3,
    'MindCare Team',
    true
),
(
    'Building Social Connections in College',
    'Strategies for making friends and building meaningful relationships.',
    'Social connections are vital for mental health and academic success. This guide offers practical advice for introverted and extroverted students...',
    'social',
    'guide',
    ARRAY['social', 'relationships', 'friendship', 'connection'],
    10,
    'Dr. Emily Rodriguez',
    true
),
(
    'Time Management for Students',
    'Effective time management strategies to reduce stress and improve productivity.',
    'Poor time management is a major source of student stress. Learn proven techniques for organizing your schedule, setting priorities...',
    'productivity',
    'article',
    ARRAY['time management', 'productivity', 'organization', 'stress'],
    9,
    'Dr. Michael Chen',
    true
);

-- Insert sample demo user (password would be hashed in production)
INSERT INTO users (email, name, university, year, major) VALUES
(
    'demo@mindcare.com',
    'Demo Student',
    'State University',
    'Junior',
    'Psychology'
);

-- Get the demo user ID for related data
DO $$
DECLARE
    demo_user_id UUID;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE email = 'demo@mindcare.com';
    
    -- Insert user preferences for demo user
    INSERT INTO user_preferences (user_id, notifications, dark_mode, language) VALUES
    (demo_user_id, true, false, 'en');
    
    -- Insert sample mood entries for demo user
    INSERT INTO mood_entries (user_id, mood_score, notes, entry_date) VALUES
    (demo_user_id, 7, 'Good day, felt productive', CURRENT_DATE - INTERVAL '6 days'),
    (demo_user_id, 5, 'Stressed about exams', CURRENT_DATE - INTERVAL '5 days'),
    (demo_user_id, 8, 'Great session with counselor', CURRENT_DATE - INTERVAL '4 days'),
    (demo_user_id, 6, 'Average day', CURRENT_DATE - INTERVAL '3 days'),
    (demo_user_id, 9, 'Excellent day, felt very positive', CURRENT_DATE - INTERVAL '2 days'),
    (demo_user_id, 4, 'Feeling anxious about presentation', CURRENT_DATE - INTERVAL '1 day'),
    (demo_user_id, 7, 'Better after talking to friends', CURRENT_DATE);
    
    -- Insert sample game sessions for demo user
    INSERT INTO game_sessions (user_id, game_type, session_data, duration_minutes, completed, score) VALUES
    (demo_user_id, 'breathing', '{"technique": "4-4-4", "cycles": 10}', 5, true, 10),
    (demo_user_id, 'memory', '{"difficulty": "medium", "moves": 12}', 3, true, 12),
    (demo_user_id, 'color_therapy', '{"colors_used": 8, "time_spent": 15}', 15, true, null),
    (demo_user_id, 'mindfulness', '{"plants_grown": 3, "level": 2}', 10, true, 30);
    
END $$;
