# 🚀 DSA Launchpad - Setup & Deployment Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account with a project
- Cloudflare account (for deployment)
- Google OAuth credentials (optional but recommended)

## Initial Setup

### 1. Clone and Install Dependencies

```bash
cd dsa-launchpad-main
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Lovable (for cloud auth)
VITE_LOVABLE_PROJECT_ID=your-project-id
```

Get these values from:

- **Supabase URL & Key**: Project Settings → API
- **Lovable Project ID**: Your Lovable dashboard

### 3. Database Setup

#### Apply Migrations

```bash
# Navigate to supabase directory
cd supabase

# Push migrations to your project
supabase db push
```

This will create:

- `profiles` table
- `user_roles` table
- `module_progress` table
- `login_activity` table (new)
- `module_feedback` table (new)
- `student_metadata` table (new)

#### Verify Migration Success

In Supabase Dashboard:

1. Go to SQL Editor
2. Run:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Should show all 6 tables.

### 4. Set Up Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:5173/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)

6. In Supabase Dashboard:
   - Go to Authentication → Providers
   - Enable Google
   - Add Client ID and Client Secret

### 5. Grant Admin Role to Instructors

In Supabase SQL Editor:

```sql
-- Add admin role for instructor
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'instructor@example.com'
ON CONFLICT DO NOTHING;
```

Repeat for each instructor.

### 6. Configure Login Activity Tracking

This happens automatically, but you can verify:

```sql
-- Check login activity table exists
SELECT * FROM public.login_activity LIMIT 1;
```

## Development

### Start Development Server

```bash
npm run dev
```

Access at `http://localhost:5173`

### Development Workflow

1. **Create a test account**:
   - Go to `/login`
   - Sign up with test email
   - This automatically creates profile

2. **Test admin features**:
   - Grant admin role via SQL
   - Go to `/admin` to see dashboard

3. **Test module tracking**:
   - Click Day 1 to open module
   - Click "Mark complete"
   - Should appear in admin dashboard

## Building for Production

### Build

```bash
npm run build
```

### Deploy to Cloudflare

```bash
# If using Cloudflare Workers
npm run build
wrangler deploy
```

### Deploy to Other Platforms

**Vercel:**

```bash
vercel deploy
```

**Netlify:**

```bash
netlify deploy --prod --dir=dist
```

**Docker:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

## Environment Variables for Production

### Required

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_LOVABLE_PROJECT_ID=your-project-id
```

### Optional

```env
VITE_API_BASE_URL=your-api-endpoint
VITE_LOG_LEVEL=info
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Test sign up flow
- [ ] Test login flow (email + Google)
- [ ] Test module tracking
- [ ] Test admin dashboard access
- [ ] Test data export
- [ ] Verify email collection works
- [ ] Test on mobile devices
- [ ] Check error handling
- [ ] Monitor Supabase usage
- [ ] Set up alerts for errors

## Testing

### Run Tests

```bash
npm run test
```

### Manual Testing Checklist

#### Authentication

- [ ] Email signup works
- [ ] Email login works
- [ ] Google OAuth works
- [ ] Password reset works
- [ ] Logout works

#### Student Features

- [ ] Homepage loads
- [ ] Can mark days complete
- [ ] Progress bar updates
- [ ] Can view module content
- [ ] Can access LeetCode links

#### Admin Features

- [ ] Admin dashboard loads
- [ ] Can search students
- [ ] Can filter by phase
- [ ] Can export CSV
- [ ] Can copy emails
- [ ] Statistics are accurate

#### UI/UX

- [ ] Mobile responsive
- [ ] Loading states work
- [ ] Animations smooth
- [ ] Colors correct
- [ ] Accessibility (keyboard nav)

## Common Issues & Solutions

### Issue: "Supabase URL not set"

**Solution**: Check `.env.local` has correct `VITE_SUPABASE_URL`

### Issue: Admin dashboard shows "Admin only"

**Solution**: Ensure user_role is set in database for your user

### Issue: Google OAuth not working

**Solution**:

1. Verify redirect URI matches exactly
2. Check Google OAuth credentials
3. Verify enabled in Supabase

### Issue: Data not appearing in admin dashboard

**Solution**:

1. Check RLS policies are correct
2. Verify user has completed days
3. Check database migrations ran

### Issue: Slow page loads

**Solution**:

1. Check Supabase indexes
2. Optimize database queries
3. Enable caching

## Monitoring & Analytics

### Supabase Dashboard

Monitor:

- Database usage
- Auth sign-ups
- API call rates
- Row security policies
- Database size

### Application Monitoring

Track:

- Page load times
- Error rates
- User engagement
- Feature usage

## Scaling Considerations

### Database

- Enable backups
- Set up replication
- Monitor query performance
- Optimize indexes

### Authentication

- Monitor failed login attempts
- Track concurrent users
- Set rate limits

### Content Delivery

- Use CDN for static assets
- Cache API responses
- Compress assets

## Maintenance

### Regular Tasks

- Review admin dashboard weekly
- Monitor student progress
- Update course content if needed
- Backup database monthly
- Review error logs

### Updates

- Keep dependencies updated
- Review security updates
- Test before deploying

## Support & Troubleshooting

### Debug Mode

Enable detailed logging:

```javascript
// In development
localStorage.setItem("debug", "dsa-*");
```

### Check Logs

**Supabase:**

- Dashboard → Logs → Database
- Dashboard → Logs → Auth

**Application:**

- Browser console (F12)
- Network tab

**Server (if using backend):**

- Application logs
- Error tracking service

## Backup & Recovery

### Database Backup

Supabase automatic daily backups. To manually backup:

```sql
-- Export tables as CSV
-- Use Supabase Dashboard → Import Data
```

### User Data Export

For GDPR/privacy:

```sql
SELECT * FROM public.profiles WHERE id = 'user-id';
SELECT * FROM public.module_progress WHERE user_id = 'user-id';
SELECT * FROM public.login_activity WHERE user_id = 'user-id';
```

## Performance Optimization

### Frontend

- Lazy load modules
- Optimize images
- Minimize CSS/JS
- Use React.memo for components

### Backend

- Add database indexes
- Cache frequent queries
- Optimize RLS policies
- Use pagination

## Security Considerations

1. **Rate Limiting**: Enabled by default on Auth
2. **RLS Policies**: Verify and maintain
3. **Secrets**: Never commit `.env` files
4. **HTTPS**: Always use in production
5. **CORS**: Configure properly for your domain

## Next Steps

1. Deploy to production
2. Share with students
3. Monitor first week closely
4. Gather feedback
5. Iterate and improve

---

**Version**: 2.0  
**Last Updated**: May 21, 2026  
**Status**: Ready for Production ✅
