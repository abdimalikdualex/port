-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "hashedPassword" VARCHAR(255),
  image VARCHAR(255),
  role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Course table
CREATE TABLE IF NOT EXISTS "Course" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  "imageUrl" VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  lectures INTEGER NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Video table
CREATE TABLE IF NOT EXISTS "Video" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  "order" INTEGER NOT NULL,
  "isPreview" BOOLEAN NOT NULL DEFAULT FALSE,
  "courseId" UUID NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Material table
CREATE TABLE IF NOT EXISTS "Material" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "fileUrl" VARCHAR(255) NOT NULL,
  "fileType" VARCHAR(50) NOT NULL,
  "courseId" UUID NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Purchase table
CREATE TABLE IF NOT EXISTS "Purchase" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "courseId" UUID NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  "paymentMethod" VARCHAR(50) NOT NULL,
  "transactionId" VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'completed',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "courseId")
);

-- Create Comment table
CREATE TABLE IF NOT EXISTS "Comment" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "courseId" UUID NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "parentId" UUID REFERENCES "Comment"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create SupportChat table
CREATE TABLE IF NOT EXISTS "SupportChat" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Message table
CREATE TABLE IF NOT EXISTS "Message" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  "isFromAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
  "supportChatId" UUID NOT NULL REFERENCES "SupportChat"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
