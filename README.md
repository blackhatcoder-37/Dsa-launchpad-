# 🎌 DSA Launchpad

> A cozy, warm, and engaging educational web platform for teaching Data Structures & Algorithms in Python to 25 beginner students over 25 days.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen) ![Version](https://img.shields.io/badge/version-2.0%20Enhanced-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Overview

DSA Launchpad is a modern, beautifully designed educational platform inspired by Studio Ghibli films. It guides 25 students through a carefully structured 25-day journey from basic memory concepts through advanced algorithms—all in a warm, supportive, and visually cohesive environment.

### Key Features

✨ **For Students:**

- 📅 Interactive 25-day roadmap with phase-based progression
- 🎨 Beautiful, warm UI inspired by Studio Ghibli
- 📊 Real-time progress tracking
- 💡 Detailed theory explanations with hand-drawn SVG diagrams
- 💻 Python code examples with syntax highlighting
- 🎯 Curated LeetCode practice problems
- 🏆 Capstone portfolio projects
- 🔐 Secure email/password + Google OAuth authentication

📊 **For Instructors:**

- 👥 Admin analytics dashboard with live student tracking
- 📈 Progress visualization and filtering
- 📧 Email list export for communications
- 📥 CSV data export for reporting
- 🔍 Student search and filtering by phase
- 📱 Responsive design for mobile management

## 🎯 What Students Learn

The 25-day curriculum covers:

### Phase 1: Foundations (Days 1-5)

- RAM, pointers, and Big-O complexity
- Dynamic arrays and memory allocation
- String mechanics and two-pointer technique
- Hash maps and sets
- Linked lists

### Phase 2: Linear Structures (Days 6-10)

- Stacks and function calls
- Queues and deques
- Binary search and divide-and-conquer
- Sliding window technique
- Sorting fundamentals

### Phase 3: Recursion & Advanced Sorting (Days 11-15)

- Mechanics of recursion
- Merge sort and divide-and-conquer
- Quick sort and partitioning
- Matrix and 2D array traversal
- Complexity review

### Phase 4: Trees & Graphs (Days 16-20)

- Binary trees and BSTs
- Tree traversals (DFS: inorder, preorder, postorder)
- Breadth-first search
- Graphs and adjacency lists
- Graph traversals

### Phase 5: Optimization & Capstone (Days 21-25)

- Heaps and priority queues
- Greedy algorithms
- Dynamic programming
- Bit manipulation
- Portfolio showcase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- Google OAuth credentials (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dsa-launchpad.git
cd dsa-launchpad-main

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the platform.

### Deployment

```bash
# Build for production
npm run build

# Deploy (example: Cloudflare)
wrangler deploy
```

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 📚 Documentation

- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Detailed overview of all enhancements
- **[SETUP.md](./SETUP.md)** - Complete setup and deployment guide
- **[DATABASE.md](./DATABASE.md)** - Database schema and structure
- **[API.md](./API.md)** - API endpoints and Supabase RLS policies

## 🎨 Design System

### Colors (Studio Ghibli Inspired)

- **Primary**: Lantern Amber - Warm, inviting accent
- **Secondary**: Moss Green - Natural, calming
- **Accent**: Cherry Blossom - Playful highlights
- **Background**: Forest Dark - Comfortable and easy on eyes

### Typography

- **Display**: Fraunces (serif) - Warm, welcoming
- **Body**: Inter (sans-serif) - Clean, modern
- **Mono**: JetBrains Mono - Code and technical content

### Animation

- Subtle, smooth transitions
- Hand-drawn-inspired SVG diagrams
- Micro-interactions for feedback
- Loading skeletons for perceived performance

## 🔧 Tech Stack

| Layer             | Technology                   |
| ----------------- | ---------------------------- |
| **Frontend**      | React 18 + TypeScript        |
| **Routing**       | TanStack Router v1           |
| **UI Components** | Shadcn/ui + Custom           |
| **Styling**       | Tailwind CSS + Custom Tokens |
| **State**         | TanStack Query, React Hooks  |
| **Auth**          | Supabase Auth, Lovable Cloud |
| **Database**      | PostgreSQL (Supabase)        |
| **Deployment**    | Cloudflare Workers/Pages     |

## 📊 Admin Dashboard Features

### Real-Time Analytics

- Total students count
- Average progress percentage
- Active users (last 7 days)
- Fully completed students count
- Visual progress bars with percentages

### Filtering & Sorting

```
Phase Filters: All | Days 1-5 | 6-10 | 11-15 | 16-20 | 21-25
Sort Options:  Progress ↓ | Last Login | Join Date | Email A-Z
Search:        By email or student name
```

### Data Export

- CSV export of all student data
- Copy email list for bulk communications
- Last login timestamps
- Completed days tracking

## 🔐 Security

- **Row Level Security (RLS)**: All database access controlled by Supabase RLS policies
- **Authentication**: Secure email/password and OAuth integration
- **Privacy**: Instructor-only admin access, students see only their data
- **HTTPS**: Required in production
- **Rate Limiting**: Built-in authentication rate limits

## 📱 Responsive Design

Fully responsive across:

- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 📺 Wide screens (1536px+)

## 🎯 Student Progress Tracking

### What Gets Tracked

- Module completion (which days finished)
- Last login timestamp
- Account creation date
- Full name and email
- Optional: Learning pace preference, timezone, language

### What Students See

- Current progress percentage
- Completed days out of 25
- Learning streak counter
- Personalized encouragement messages
- Which module to start next

## 🚀 New Features in v2.0

- ✅ Enhanced login with Google OAuth
- ✅ Improved admin dashboard with filtering
- ✅ CSV export functionality
- ✅ Email list copying for bulk communications
- ✅ Loading skeletons for better UX
- ✅ Error boundaries and handling
- ✅ Progress tracking with streaks
- ✅ Database enhancements for analytics
- ✅ Better mobile responsiveness
- ✅ Accessibility improvements

## 📈 Future Roadmap

- [ ] Module ratings and feedback system
- [ ] Student achievement badges
- [ ] Email reminders for streaks
- [ ] Code execution environment
- [ ] Peer discussion forums
- [ ] AI-powered learning suggestions
- [ ] Certificate generation
- [ ] Student portfolio showcase

## 🐛 Troubleshooting

### Login Issues

Check that Supabase credentials are correct and OAuth is configured.

### Admin Dashboard Not Showing

Verify the user has the `admin` role in the `user_roles` table.

### Data Not Appearing

Ensure database migrations have been applied and RLS policies are set.

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## 📧 Email Collection

### Information Collected at Signup

- Email address (required)
- Full name (required)
- Password (required) or OAuth

### Data Storage

- Stored securely in Supabase
- Never shared without consent
- GDPR compliant privacy practices

### Admin Access

- Instructors can view emails through admin dashboard
- Can export for newsletters or communications
- Can filter by engagement level

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Studio Ghibli for design inspiration
- TanStack for amazing routing and query libraries
- Shadcn/ui for beautiful components
- Supabase for backend infrastructure
- All students on this cozy DSA journey

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/dsa-launchpad/issues)
- **Documentation**: See the docs folder
- **Email**: support@example.com

---

## 🌟 Version History

### v2.0 (Current)

- Enhanced admin dashboard
- Google OAuth integration
- Improved homepage design
- Database enhancements
- Better error handling
- Loading skeletons
- Progress tracking with streaks

### v1.0

- Initial launch
- 25-day curriculum
- Basic progress tracking
- Capstone projects
- Module diagrams

---

Made with warm tea, quiet music, and a lot of ❤️  
DSA Launchpad © 2026

**Ready to begin? [Start the journey](http://localhost:5173) →**
