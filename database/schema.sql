CREATE DATABASE IF NOT EXISTS gidy_profile;
USE gidy_profile;

DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  title VARCHAR(180) NOT NULL,
  bio TEXT NOT NULL,
  avatar VARCHAR(500) NOT NULL,
  location VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  platform VARCHAR(80) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  level INT NOT NULL DEFAULT 50,
  endorsements INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  company VARCHAR(180) NOT NULL,
  position VARCHAR(180) NOT NULL,
  duration VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_id INT NOT NULL,
  school VARCHAR(180) NOT NULL,
  degree VARCHAR(180) NOT NULL,
  duration VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

INSERT INTO profiles (name, title, bio, avatar, location, email)
SELECT
  'Your Name',
  'Full-Stack Developer',
  'Short bio that matches the Gidy profile vibe. Edit this in the UI.',
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=512&h=512&fit=crop',
  'India',
  'you@example.com'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM profiles);

SET @pid := (SELECT id FROM profiles ORDER BY id ASC LIMIT 1);

INSERT INTO social_links (profile_id, platform, url, icon, sort_order)
SELECT @pid, 'LinkedIn', 'https://linkedin.com', 'linkedin', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE profile_id=@pid AND platform='LinkedIn');

INSERT INTO social_links (profile_id, platform, url, icon, sort_order)
SELECT @pid, 'GitHub', 'https://github.com', 'github', 2
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM social_links WHERE profile_id=@pid AND platform='GitHub');

INSERT INTO skills (profile_id, name, level, endorsements, sort_order)
SELECT @pid, 'React', 85, 3, 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM skills WHERE profile_id=@pid AND name='React');

INSERT INTO skills (profile_id, name, level, endorsements, sort_order)
SELECT @pid, 'Node.js', 80, 2, 2
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM skills WHERE profile_id=@pid AND name='Node.js');

INSERT INTO experience (profile_id, company, position, duration, description, sort_order)
SELECT @pid, 'Example Co', 'Software Engineer', '2024 - Present', 'Built product features end-to-end.', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM experience WHERE profile_id=@pid AND company='Example Co');

INSERT INTO education (profile_id, school, degree, duration, sort_order)
SELECT @pid, 'Example University', 'B.Tech / BS', '2020 - 2024', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM education WHERE profile_id=@pid AND school='Example University');
