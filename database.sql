-- ═══════════════════════════════════════════════════════════════
-- AHMED RAZA PORTFOLIO — COMPLETE DATABASE SCHEMA
-- Execute this entire file in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- 1. PROJECTS (original — used by /api/projects)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT NOT NULL,
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.projects (title, description, technologies, github_url, live_url, featured, sort_order) VALUES
('E-Commerce Platform', 'A full-featured e-commerce platform with product management, shopping cart, secure checkout, user authentication and admin dashboard. Built with a modern React frontend and robust Node.js backend.', 'React.js, Node.js, Express.js, MongoDB, REST APIs, JWT Authentication', 'https://github.com/ahmedraza', 'https://example.com', true, 1),
('Task Management Dashboard', 'A real-time collaborative task management application with drag-and-drop boards, team assignments, progress tracking and analytics. Features a clean, intuitive interface built with Next.js.', 'Next.js, TypeScript, Tailwind CSS, Firebase, Framer Motion', 'https://github.com/ahmedraza', 'https://example.com', true, 2),
('Social Media REST API', 'A scalable RESTful API for a social media platform with user profiles, posts, comments, likes, follow system and real-time notifications. Fully documented with Postman collections.', 'PHP, Laravel, MySQL, REST APIs, JWT Authentication', 'https://github.com/ahmedraza', '', true, 3),
('Portfolio Generator', 'A dynamic portfolio builder that allows developers to create stunning portfolios by simply entering their information. Features customizable themes, responsive layouts and one-click deployment.', 'React.js, Tailwind CSS, Firebase, Vercel, Framer Motion', 'https://github.com/ahmedraza', 'https://example.com', true, 4),
('Real-time Chat Application', 'A modern real-time messaging application with private and group chats, file sharing, message reactions, typing indicators and read receipts. Optimized for performance at scale.', 'Node.js, Express.js, MongoDB, REST APIs, JWT Authentication', 'https://github.com/ahmedraza', 'https://example.com', true, 5),
('Blog CMS Platform', 'A powerful content management system for blogs with markdown editing, image optimization, SEO tools, analytics dashboard and multi-author support. Built for speed and accessibility.', 'Next.js, TypeScript, MySQL, Vercel, Tailwind CSS', 'https://github.com/ahmedraza', 'https://example.com', true, 6);


-- ─────────────────────────────────────────────
-- 2. CERTIFICATES (original — used by /api/certificates)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certificates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.certificates (title, category, sort_order) VALUES
('Frontend Development', 'Frontend', 1),
('React', 'Frontend', 2),
('Next.js', 'Frontend', 3),
('Backend Development', 'Backend', 4),
('PHP', 'Backend', 5),
('Laravel', 'Backend', 6),
('Node.js', 'Backend', 7),
('REST APIs', 'Backend', 8),
('MySQL', 'Database', 9),
('MongoDB', 'Database', 10),
('Docker', 'DevOps', 11),
('Git', 'DevOps', 12),
('Cloud Deployment', 'DevOps', 13);


-- ─────────────────────────────────────────────
-- 3. TECH_ITEMS (used by /api/tech-items)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tech_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

INSERT INTO public.tech_items (name, category, sort_order) VALUES
('React.js', 'Frontend', 1),
('Next.js', 'Frontend', 2),
('JavaScript', 'Frontend', 3),
('TypeScript', 'Frontend', 4),
('HTML5', 'Frontend', 5),
('CSS3', 'Frontend', 6),
('Tailwind CSS', 'Frontend', 7),
('Bootstrap', 'Frontend', 8),
('Framer Motion', 'Frontend', 9),
('GSAP', 'Frontend', 10),
('PHP', 'Backend', 11),
('Laravel', 'Backend', 12),
('Node.js', 'Backend', 13),
('Express.js', 'Backend', 14),
('REST APIs', 'Backend', 15),
('JWT Authentication', 'Backend', 16),
('MySQL', 'Database', 17),
('MongoDB', 'Database', 18),
('Firebase', 'Database', 19),
('Git', 'Tools', 20),
('GitHub', 'Tools', 21),
('VS Code', 'Tools', 22),
('Postman', 'Tools', 23),
('Composer', 'Tools', 24),
('NPM', 'Tools', 25),
('Linux', 'Tools', 26),
('Figma', 'Tools', 27),
('Vercel', 'Tools', 28),
('Render', 'Tools', 29);


-- ─────────────────────────────────────────────
-- 4. CONTACT_MESSAGES (used by /api/contact)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ─────────────────────────────────────────────
-- 5. PROJECT_CASES (used by /api/project-cases)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_cases (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  overview TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  features JSONB NOT NULL,
  process_steps JSONB NOT NULL,
  results JSONB NOT NULL,
  color_palette JSONB NOT NULL,
  tech_list JSONB NOT NULL,
  device_type TEXT NOT NULL,
  layout_variant INTEGER NOT NULL,
  gradient_from TEXT NOT NULL,
  gradient_to TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT ''
);

INSERT INTO public.project_cases (title, subtitle, overview, challenge, solution, features, process_steps, results, color_palette, tech_list, device_type, layout_variant, gradient_from, gradient_to, sort_order, github_url, live_url) VALUES
(
  'E-Commerce Platform',
  'Next-Generation Digital Commerce',
  'A comprehensive e-commerce platform engineered for scale, combining beautiful user experience with robust backend architecture to deliver seamless shopping experiences across all devices.',
  'Traditional e-commerce platforms struggle with performance at scale — offering either beautiful interfaces with limited functionality or powerful backends with outdated UIs. The challenge was to bridge this gap, creating a platform that delivers both visual excellence and enterprise-grade performance under heavy traffic loads.',
  'Built a decoupled architecture with React on the frontend and Node.js on the backend, connected through optimized REST APIs. Implemented Redis caching, CDN delivery, and lazy loading to achieve sub-2-second load times. JWT authentication ensures secure user sessions across the entire platform.',
  '[{"title":"Product Catalog","description":"Advanced product management with categories, filters, search and real-time inventory tracking"},{"title":"Smart Shopping Cart","description":"Persistent cart with real-time price calculation, discount codes and saved items"},{"title":"Secure Checkout","description":"Multi-step checkout with payment processing, address validation and order confirmation"},{"title":"Admin Dashboard","description":"Complete store management with analytics, inventory control and order processing"},{"title":"Analytics Engine","description":"Real-time sales analytics, user behavior tracking and conversion optimization"},{"title":"Multi-Currency","description":"Automatic currency conversion with region-based pricing and tax calculation"}]'::jsonb,
  '[{"step":1,"title":"Research & Discovery","description":"Analyzed market leaders, user expectations and technical requirements"},{"step":2,"title":"Information Architecture","description":"Designed user flows, navigation structure and data models"},{"step":3,"title":"Visual Design","description":"Created design system with components, typography and color palette"},{"step":4,"title":"Frontend Development","description":"Built responsive React components with state management and animations"},{"step":5,"title":"Backend & API","description":"Engineered Node.js API with authentication, caching and optimization"},{"step":6,"title":"Testing & Launch","description":"Comprehensive testing, performance optimization and production deployment"}]'::jsonb,
  '[{"value":"99.9%","label":"Uptime"},{"value":"1.8s","label":"Load Time"},{"value":"50K+","label":"Active Users"},{"value":"4.8★","label":"User Rating"}]'::jsonb,
  '["#8B5CF6", "#3B82F6", "#1E293B", "#F8FAFC", "#10B981"]'::jsonb,
  '["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"]'::jsonb,
  'laptop', 1, '#8B5CF6', '#3B82F6', 1, 'https://github.com/ahmedraza', 'https://example.com'
),
(
  'Task Management Dashboard',
  'Collaborative Project Intelligence',
  'A real-time collaborative task management platform that transforms how teams plan, track and deliver projects — combining intuitive design with powerful automation and live synchronization.',
  'Existing project management tools overwhelm users with complexity while lacking real-time collaboration. Teams needed a solution that feels effortless yet delivers enterprise-grade project intelligence with seamless multi-user coordination.',
  'Designed a drag-and-drop interface powered by Firebase real-time sync, with intelligent task automation and customizable workflows. The result is a tool that adapts to how teams actually work, not the other way around.',
  '[{"title":"Drag & Drop Boards","description":"Intuitive Kanban boards with customizable columns, labels and priorities"},{"title":"Real-time Sync","description":"Instant collaboration with live cursors, presence indicators and conflict resolution"},{"title":"Smart Automation","description":"Rule-based task automation with triggers, actions and scheduled workflows"},{"title":"Progress Analytics","description":"Visual dashboards with burndown charts, velocity tracking and forecasting"},{"title":"Custom Workflows","description":"Flexible workflow builder with custom statuses, transitions and automations"},{"title":"Time Tracking","description":"Built-in timers with reports, billable hours and team productivity insights"}]'::jsonb,
  '[{"step":1,"title":"User Research","description":"Interviewed 50+ teams to understand workflow pain points and needs"},{"step":2,"title":"Information Architecture","description":"Mapped user journeys, designed navigation and data hierarchy"},{"step":3,"title":"Prototyping","description":"Created interactive prototypes for usability testing and validation"},{"step":4,"title":"Visual Design","description":"Developed comprehensive design system with dark and light themes"},{"step":5,"title":"Development","description":"Built with Next.js and TypeScript for type safety and performance"},{"step":6,"title":"Launch & Iterate","description":"Deployed with continuous feedback loops and rapid iteration cycles"}]'::jsonb,
  '[{"value":"40%","label":"Efficiency Gain"},{"value":"10K+","label":"Active Teams"},{"value":"98%","label":"Satisfaction"},{"value":"500K+","label":"Tasks Completed"}]'::jsonb,
  '["#3B82F6", "#06B6D4", "#0F172A", "#F1F5F9", "#F59E0B"]'::jsonb,
  '["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Framer Motion"]'::jsonb,
  'desktop', 2, '#3B82F6', '#06B6D4', 2, 'https://github.com/ahmedraza', 'https://example.com'
),
(
  'Social Media REST API',
  'Scalable Social Architecture',
  'A production-grade RESTful API powering social media functionality — designed for millions of requests with comprehensive documentation and a developer-first approach.',
  'Building a social media API that maintains sub-50ms response times while handling complex relationships between users, posts and interactions at massive scale with consistent data integrity.',
  'Engineered with Laravel''s robust ecosystem, implementing database optimization, eager loading and intelligent caching strategies. Comprehensive API documentation with Postman collections enables rapid third-party integration.',
  '[{"title":"Auth System","description":"JWT-based authentication with refresh tokens, OAuth2 and role management"},{"title":"Social Graph","description":"Follow/unfollow system with mutual connections and suggestion engine"},{"title":"Media Pipeline","description":"Image and video upload with compression, thumbnails and CDN delivery"},{"title":"Notification Engine","description":"Real-time push notifications with preferences and delivery tracking"},{"title":"Search & Filter","description":"Full-text search with advanced filtering, sorting and pagination"},{"title":"Rate Limiting","description":"Intelligent rate limiting with burst allowance and abuse prevention"}]'::jsonb,
  '[{"step":1,"title":"API Architecture","description":"Designed RESTful endpoints, versioning strategy and response formats"},{"step":2,"title":"Database Design","description":"Normalized schema with indexes, relationships and migration plans"},{"step":3,"title":"Core Development","description":"Built controllers, middleware, services and repository patterns"},{"step":4,"title":"Documentation","description":"OpenAPI spec with interactive docs and Postman collections"},{"step":5,"title":"Load Testing","description":"Stress tested with 10M+ requests to optimize bottlenecks"},{"step":6,"title":"Deployment","description":"Containerized deployment with auto-scaling and monitoring"}]'::jsonb,
  '[{"value":"10M+","label":"Requests/Day"},{"value":"45ms","label":"Avg Response"},{"value":"99.99%","label":"Uptime"},{"value":"100+","label":"Endpoints"}]'::jsonb,
  '["#10B981", "#3B82F6", "#0F172A", "#ECFDF5", "#8B5CF6"]'::jsonb,
  '["PHP", "Laravel", "MySQL", "REST APIs", "JWT Auth", "Redis"]'::jsonb,
  'mobile', 3, '#10B981', '#3B82F6', 3, 'https://github.com/ahmedraza', ''
),
(
  'Portfolio Generator',
  'Instant Portfolio Creation',
  'A dynamic portfolio builder that empowers developers to create stunning portfolios in minutes — no coding required, just enter your information and deploy with a single click.',
  'Many developers lack the time or design skills to create professional portfolios. Existing solutions offer limited customization and generic templates that fail to stand out in a competitive job market.',
  'Built a WYSIWYG editor with premium customizable themes, real-time preview and one-click Vercel deployment. Every portfolio is responsive, SEO-optimized and uniquely yours — standing out from the crowd.',
  '[{"title":"Visual Editor","description":"Drag-and-drop WYSIWYG editor with live preview and instant updates"},{"title":"Premium Themes","description":"Curated collection of professional themes with full customization"},{"title":"One-Click Deploy","description":"Deploy to Vercel instantly with custom domain and SSL"},{"title":"Live Preview","description":"Real-time responsive preview across desktop, tablet and mobile"},{"title":"SEO Tools","description":"Built-in meta tags, Open Graph, sitemap and structured data"},{"title":"Analytics","description":"Visitor tracking with page views, referrals and geographic data"}]'::jsonb,
  '[{"step":1,"title":"Market Research","description":"Analyzed 200+ developer portfolios to identify patterns and gaps"},{"step":2,"title":"UX Design","description":"Designed intuitive editor flow with minimal learning curve"},{"step":3,"title":"Prototyping","description":"Built interactive prototypes for editor and preview experience"},{"step":4,"title":"Development","description":"React component system with theme engine and deployment pipeline"},{"step":5,"title":"Beta Testing","description":"500+ beta testers validated usability and deployment flow"},{"step":6,"title":"Launch","description":"Product Hunt launch with 1000+ upvotes and featured placement"}]'::jsonb,
  '[{"value":"5K+","label":"Portfolios Built"},{"value":"98","label":"Mobile Score"},{"value":"3min","label":"Avg Build Time"},{"value":"4.9★","label":"User Rating"}]'::jsonb,
  '["#F59E0B", "#8B5CF6", "#1E293B", "#FFFBEB", "#10B981"]'::jsonb,
  '["React.js", "Tailwind CSS", "Firebase", "Vercel", "Framer Motion"]'::jsonb,
  'tablet', 4, '#F59E0B', '#8B5CF6', 4, 'https://github.com/ahmedraza', 'https://example.com'
),
(
  'Real-time Chat Application',
  'Instant Communication Engine',
  'A modern real-time messaging platform designed for speed and reliability — featuring end-to-end encryption, rich media support and seamless cross-device synchronization.',
  'Delivering instant message delivery at scale while maintaining message order, handling offline scenarios gracefully and providing a smooth typing experience without interface jitter or data loss.',
  'Implemented WebSocket connections with optimistic UI updates and intelligent message queuing. Messages appear instantly for the sender while being reliably delivered to recipients, even on unstable connections.',
  '[{"title":"Private & Group Chat","description":"One-on-one and group conversations with admin controls and permissions"},{"title":"File Sharing","description":"Drag-and-drop file sharing with preview, compression and cloud storage"},{"title":"Reactions & Emojis","description":"Message reactions, custom emojis and expressive communication"},{"title":"Typing Indicators","description":"Real-time typing status with presence awareness and activity feeds"},{"title":"Read Receipts","description":"Message delivery and read confirmation with timestamp tracking"},{"title":"Voice Messages","description":"One-tap voice recording with waveform visualization and playback"}]'::jsonb,
  '[{"step":1,"title":"Technical Research","description":"Evaluated WebSocket libraries, protocols and scaling strategies"},{"step":2,"title":"System Architecture","description":"Designed message queue, presence system and offline sync"},{"step":3,"title":"UI/UX Design","description":"Created chat interface with animations and gesture interactions"},{"step":4,"title":"Core Development","description":"Built real-time engine with optimistic updates and queuing"},{"step":5,"title":"Load Testing","description":"Simulated 100K concurrent connections to validate performance"},{"step":6,"title":"Launch","description":"Phased rollout with monitoring, alerting and rapid response"}]'::jsonb,
  '[{"value":"<100ms","label":"Latency"},{"value":"1M+","label":"Messages/Day"},{"value":"99.9%","label":"Delivery Rate"},{"value":"25K+","label":"Active Users"}]'::jsonb,
  '["#EF4444", "#8B5CF6", "#0F172A", "#FEF2F2", "#3B82F6"]'::jsonb,
  '["Node.js", "Express.js", "MongoDB", "WebSocket", "JWT Auth", "Redis"]'::jsonb,
  'mobile', 1, '#EF4444', '#8B5CF6', 5, 'https://github.com/ahmedraza', 'https://example.com'
),
(
  'Blog CMS Platform',
  'Content Management Reimagined',
  'A powerful yet intuitive content management system that makes publishing beautiful, high-performing blog content effortless — from draft to readers in minutes.',
  'Existing CMS platforms either sacrifice writing experience for customization flexibility or offer beautiful editors with limited extensibility. Writers needed both — a delightful writing experience with unlimited customization potential.',
  'Created a markdown-first editor with real-time preview, integrated SEO optimization and a plugin architecture that allows infinite customization without compromising the writing experience or page performance.',
  '[{"title":"Markdown Editor","description":"Distraction-free writing with real-time preview and syntax highlighting"},{"title":"Media Library","description":"Centralized media management with automatic optimization and CDN"},{"title":"SEO Suite","description":"Built-in keyword analysis, meta optimization and content scoring"},{"title":"Analytics Dashboard","description":"Reader insights with engagement metrics and growth tracking"},{"title":"Multi-Author","description":"Team collaboration with roles, editorial workflows and review process"},{"title":"Scheduling","description":"Content calendar with automated publishing and social distribution"}]'::jsonb,
  '[{"step":1,"title":"Content Strategy","description":"Researched blogger needs, content workflows and publishing patterns"},{"step":2,"title":"UX Research","description":"Tested editor paradigms with 100+ writers for optimal experience"},{"step":3,"title":"Design System","description":"Built component library with editor, dashboard and reader views"},{"step":4,"title":"Development","description":"Next.js with ISR, markdown engine and plugin architecture"},{"step":5,"title":"Testing","description":"Cross-browser testing, accessibility audit and performance profiling"},{"step":6,"title":"Launch","description":"Migration tools, onboarding flow and documentation portal"}]'::jsonb,
  '[{"value":"2K+","label":"Articles Published"},{"value":"500K+","label":"Monthly Readers"},{"value":"95+","label":"Lighthouse Score"},{"value":"4.7★","label":"User Rating"}]'::jsonb,
  '["#06B6D4", "#8B5CF6", "#0F172A", "#ECFEFF", "#F59E0B"]'::jsonb,
  '["Next.js", "TypeScript", "MySQL", "Vercel", "Tailwind CSS"]'::jsonb,
  'laptop', 2, '#06B6D4', '#8B5CF6', 6, 'https://github.com/ahmedraza', 'https://example.com'
);


-- ─────────────────────────────────────────────
-- 6. PROJECT_SCREENSHOTS (used by /api/project-screenshots)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_screenshots (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  screen_label TEXT NOT NULL,
  screen_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

INSERT INTO public.project_screenshots (project_id, screen_label, screen_path, sort_order) VALUES
(1, 'Homepage', '/projects/ecommerce-home.png', 1),
(1, 'Admin Dashboard', '/projects/ecommerce-admin.png', 2),
(2, 'Kanban Board', '/projects/task-dashboard.png', 1),
(2, 'Analytics', '/projects/task-analytics.png', 2),
(3, 'Social Feed', '/projects/social-feed.png', 1),
(3, 'User Profile', '/projects/social-profile.png', 2),
(4, 'Editor', '/projects/portfolio-editor.png', 1),
(4, 'Theme Gallery', '/projects/portfolio-themes.png', 2),
(5, 'Conversation', '/projects/chat-conversation.png', 1),
(5, 'Contacts', '/projects/chat-contacts.png', 2),
(6, 'Markdown Editor', '/projects/blog-editor.png', 1),
(6, 'Analytics', '/projects/blog-analytics.png', 2);


-- ─────────────────────────────────────────────
-- 7. CERTIFICATE_SHOWCASE (used by /api/certificate-showcase)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certificate_showcase (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  sort_order INTEGER NOT NULL
);

INSERT INTO public.certificate_showcase (title, category, issuer, year, description, image_path, accent_color, verified, sort_order) VALUES
('Frontend Development', 'Frontend', 'Coursera', '2024', 'Advanced certification in modern frontend development including responsive design, accessibility, and performance optimization.', '/certs/frontend-dev.png', '#8B5CF6', true, 1),
('React', 'Frontend', 'Meta', '2024', 'Professional certification in React.js including hooks, state management, component architecture and testing.', '/certs/react.png', '#3B82F6', true, 2),
('Next.js', 'Frontend', 'Vercel', '2024', 'Certification in Next.js App Router, server components, ISR, SSR, SSG and production deployment strategies.', '/certs/nextjs.png', '#06B6D4', true, 3),
('Backend Development', 'Backend', 'Google', '2023', 'Comprehensive backend certification covering server architecture, API design, authentication and database management.', '/certs/backend-dev.png', '#10B981', true, 4),
('PHP', 'Backend', 'LinkedIn Learning', '2023', 'Professional PHP certification covering OOP, security best practices, design patterns and modern PHP frameworks.', '/certs/php.png', '#6366F1', true, 5),
('Laravel', 'Backend', 'Udemy', '2023', 'Official Laravel certification covering Eloquent ORM, middleware, queues, events and enterprise application architecture.', '/certs/laravel.png', '#EF4444', true, 6),
('Node.js', 'Backend', 'OpenJS Foundation', '2023', 'Certified Node.js developer with expertise in async programming, streams, clustering and production deployment.', '/certs/nodejs.png', '#22C55E', true, 7),
('REST APIs', 'Backend', 'HackerRank', '2023', 'Certification in RESTful API design, authentication, rate limiting, versioning and documentation best practices.', '/certs/rest-apis.png', '#F59E0B', true, 8),
('MySQL', 'Database', 'Oracle', '2023', 'Professional MySQL certification covering query optimization, indexing, replication and database administration.', '/certs/mysql.png', '#2563EB', true, 9),
('MongoDB', 'Database', 'MongoDB University', '2023', 'Certified MongoDB developer with expertise in aggregation pipelines, indexing strategies and schema design.', '/certs/mongodb.png', '#059669', true, 10),
('Docker', 'DevOps', 'Docker', '2024', 'Professional Docker certification covering containerization, Docker Compose, multi-stage builds and orchestration.', '/certs/docker.png', '#0EA5E9', true, 11),
('Git', 'DevOps', 'GitHub', '2022', 'Certified Git professional with expertise in branching strategies, merge conflict resolution and CI/CD workflows.', '/certs/git.png', '#F97316', true, 12),
('Cloud Deployment', 'DevOps', 'AWS', '2024', 'Cloud deployment certification covering Vercel, Render, AWS services, CI/CD pipelines and infrastructure as code.', '/certs/cloud-deployment.png', '#7C3AED', true, 13);


-- ─────────────────────────────────────────────
-- 8. CURRENTLY_LEARNING (used by /api/currently-learning)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.currently_learning (
  id SERIAL PRIMARY KEY,
  technology TEXT NOT NULL,
  category TEXT NOT NULL,
  progress INTEGER NOT NULL,
  resource TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

INSERT INTO public.currently_learning (technology, category, progress, resource, sort_order) VALUES
('TypeScript', 'Language', 72, 'TypeScript Documentation', 1),
('Next.js 14', 'Framework', 85, 'Vercel Documentation', 2),
('GraphQL', 'API', 45, 'Apollo GraphQL Course', 3),
('Docker', 'DevOps', 60, 'Docker Certified Associate', 4),
('AWS', 'Cloud', 40, 'AWS Cloud Practitioner', 5),
('System Design', 'Architecture', 55, 'ByteByteGo & Designing Data-Intensive Applications', 6);


-- ─────────────────────────────────────────────
-- 9. LIVE_METRICS (used by /api/live-metrics)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.live_metrics (
  id SERIAL PRIMARY KEY,
  metric_key TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  metric_label TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

INSERT INTO public.live_metrics (metric_key, metric_value, metric_label, icon_name, sort_order) VALUES
('projects', '15+', 'Projects', 'FolderGit2', 1),
('certificates', '13', 'Certificates', 'Award', 2),
('technologies', '25+', 'Technologies', 'Code2', 3),
('github_stars', '48', 'GitHub Stars', 'Star', 4),
('repositories', '22', 'Repositories', 'GitBranch', 5),
('years', '3+', 'Years Learning', 'Calendar', 6);


-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — Allow public read, restrict writes
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_showcase ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.currently_learning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (anon + authenticated)
CREATE POLICY "Public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.tech_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.project_cases FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.project_screenshots FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.certificate_showcase FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.currently_learning FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.live_metrics FOR SELECT USING (true);

-- Contact messages: anyone can insert, no one can read (privacy)
CREATE POLICY "Anyone can insert" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Service role has full access (used by API routes with service_role key)
-- No additional policies needed — service_role bypasses RLS by default.


-- ═══════════════════════════════════════════════════════════════
-- INDEXES for query performance
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_projects_sort ON public.projects (sort_order);
CREATE INDEX IF NOT EXISTS idx_certificates_sort ON public.certificates (sort_order);
CREATE INDEX IF NOT EXISTS idx_tech_items_category ON public.tech_items (category, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_cases_sort ON public.project_cases (sort_order);
CREATE INDEX IF NOT EXISTS idx_project_screenshots_project ON public.project_screenshots (project_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_certificate_showcase_sort ON public.certificate_showcase (sort_order);
CREATE INDEX IF NOT EXISTS idx_certificate_showcase_category ON public.certificate_showcase (category);
CREATE INDEX IF NOT EXISTS idx_currently_learning_sort ON public.currently_learning (sort_order);
CREATE INDEX IF NOT EXISTS idx_live_metrics_sort ON public.live_metrics (sort_order);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages (created_at DESC);


-- ═══════════════════════════════════════════════════════════════
-- VERIFICATION — Quick check queries (run manually to verify)
-- ═══════════════════════════════════════════════════════════════

-- SELECT 'projects' as tbl, count(*) FROM public.projects
-- UNION ALL SELECT 'certificates', count(*) FROM public.certificates
-- UNION ALL SELECT 'tech_items', count(*) FROM public.tech_items
-- UNION ALL SELECT 'project_cases', count(*) FROM public.project_cases
-- UNION ALL SELECT 'project_screenshots', count(*) FROM public.project_screenshots
-- UNION ALL SELECT 'certificate_showcase', count(*) FROM public.certificate_showcase
-- UNION ALL SELECT 'currently_learning', count(*) FROM public.currently_learning
-- UNION ALL SELECT 'live_metrics', count(*) FROM public.live_metrics;
