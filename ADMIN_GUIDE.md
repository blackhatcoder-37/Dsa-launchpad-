# Admin Dashboard - Quick Reference Guide

## Accessing the Dashboard

1. **URL**: Navigate to `/admin` on the platform
2. **Requirements**: Must have `admin` role in database
3. **Redirects**: Non-admins are shown helpful message

## Setting Up Admin Access

### For Your First Admin Account

In Supabase SQL Editor:

```sql
-- Step 1: Find your user ID
SELECT id, email FROM auth.users WHERE email = 'your-instructor@example.com';

-- Step 2: Insert admin role (replace 'user-id' with actual ID)
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-id', 'admin');

-- Verify it worked
SELECT * FROM public.user_roles WHERE user_id = 'user-id';
```

### For Additional Admins

Repeat the above steps for each instructor account.

## Dashboard Overview

### Top Section

**Quick Stats:**

- 📊 Total Students: Shows all enrolled students
- 📈 Avg Progress: Overall cohort progress percentage
- 🔥 Active This Week: Students who logged in last 7 days
- ✅ Fully Completed: Students who finished all 25 days

### Action Buttons

| Button         | Function                  | Use Case                    |
| -------------- | ------------------------- | --------------------------- |
| 📥 Export CSV  | Download all student data | Reporting, backups          |
| 📧 Copy Emails | Copy all filtered emails  | Send newsletters, reminders |

## Using Filters

### Phase Filter

Located under search bar. Click to select:

```
[All Phases] [Days 1-5] [Days 6-10] [Days 11-15] [Days 16-20] [Days 21-25]
```

**Example Use Cases:**

- Check students in Phase 1: Click "Days 1-5"
- See advanced students: Click "Days 21-25"
- All students: Click "All Phases"

### Sort Options

Select from dropdown:

- **Progress ↓** (default): Highest progress first
- **Last Login**: Most recent login first
- **Join Date**: Newest members first
- **Email A-Z**: Alphabetical by email

**Example Workflows:**

- Find at-risk students: Sort by "Last Login"
- Welcome new members: Sort by "Join Date"
- Celebrate progress: Sort by "Progress ↓"

### Search

**Search box** at top of filters:

- Search by: Email address or full name
- Case-insensitive
- Real-time filtering

**Example Searches:**

- `sora@example.com` → Find Sora's account
- `kiki` → Find all students with "kiki" in name/email

## Student Table Columns

| Column             | Shows          | Notes                            |
| ------------------ | -------------- | -------------------------------- |
| **Student**        | Name & Email   | Click to view details (future)   |
| **Progress**       | Visual bar + % | Green bar shows completion       |
| **Completed Days** | X/25 format    | Badge showing count              |
| **Last Login**     | Time since     | Smart formatting (Today, 3d ago) |
| **Joined**         | Signup date    | Shows when account created       |

## Data Export (CSV)

### Export Button

Click **"Export CSV"** to download file named:

```
dsa-launchpad-export-YYYY-MM-DD.csv
```

### CSV Format

```
Email | Full Name | Completed Days | Progress % | Last Login | Joined
sora@example.com | Sora | 1,2,3,4,5 | 20 | 2026-05-21 10:30 | 2026-05-20
```

### Uses

- Admin reports
- Compliance/records
- Progress analysis
- Student contact verification
- Platform usage metrics

## Email Management

### Copy Emails Button

Click **"Copy Emails"** to copy all filtered student emails to clipboard.

**Format:**

```
email1@example.com; email2@example.com; email3@example.com
```

### Use In Email Client

1. Copy emails from dashboard
2. Open your email client (Gmail, Outlook, etc.)
3. Paste into BCC or TO field
4. Compose your message
5. Send

### Example Messages

**Weekly Check-in:**

```
Hi everyone!

Just checking in on your DSA Launchpad progress. You're doing great!
Keep it up this week.

Best regards,
[Your Name]
```

**Module Reminder:**

```
Hey! Just a gentle reminder that we're in Phase 2 of DSA Launchpad.
If you have questions, feel free to reach out.
```

**Congratulations:**

```
🎉 Amazing work completing Phase 1!
Ready for the next challenge? Phase 2 awaits!
```

## Understanding Progress Metrics

### Progress Percentage

```
Progress % = (Completed Days / 25) × 100
```

**Interpretation:**

- 0-20%: Just starting (Days 1-5)
- 20-40%: Phase 2 (Days 6-10)
- 40-60%: Phase 3 (Days 11-15)
- 60-80%: Phase 4 (Days 16-20)
- 80-100%: Phase 5 (Days 21-25)

### Completed Days

Shows list of days completed (e.g., "1,2,3,4,5"):

- **Missing days**: Indicate areas needing catch-up
- **Sequential days**: Show consistent progress
- **Gaps**: May indicate student confusion

### Last Login

Smart time formatting:

- "Today" = Logged in today
- "Yesterday" = Logged in yesterday
- "3d ago" = 3 days ago
- "2w ago" = 2 weeks ago
- "Never" = Never logged in

**Engagement Interpretation:**

- Today/Yesterday: Highly engaged ✅
- <7 days: Regular engagement ✅
- 7-14 days: Needs reminder ⚠️
- > 14 days: At-risk student 🚨

## Common Admin Tasks

### Task 1: Find At-Risk Students

```
1. Sort by: "Last Login"
2. Look for entries > 7 days
3. Copy emails of inactive students
4. Send engagement email
```

### Task 2: Check Phase Progression

```
1. Filter by: "Days 1-5"
2. Note how many students completed
3. Repeat for other phases
4. Identify bottleneck phases
```

### Task 3: Generate Report

```
1. Click "Export CSV"
2. Open in Excel or Google Sheets
3. Sort by Progress (highest first)
4. Create summary statistics
5. Share with stakeholders
```

### Task 4: Weekly Check-In

```
1. Sort by: "Last Login"
2. Find students logged in < 3 days
3. Copy their emails
4. Send "How's it going?" message
```

### Task 5: Celebrate Completions

```
1. Filter by: "Days 21-25"
2. Sort by: "Progress ↓"
3. Find 100% complete students
4. Copy emails
5. Send congratulations
```

## Common Questions

### Q: Can I see individual student details?

**A**: Currently shows summary. Detailed view coming soon.

### Q: How often does data update?

**A**: Real-time. Data updates as students interact with platform.

### Q: Can students see the admin dashboard?

**A**: No. Only accounts with admin role can access.

### Q: How do I add more admins?

**A**: Use SQL in Supabase to insert role (see "Setting Up Admin Access").

### Q: Can I delete student records?

**A**: Through Supabase console only. Not available in UI for safety.

### Q: What if a student signs up with wrong email?

**A**: Have them create new account or contact Supabase support for correction.

## Keyboard Shortcuts (Coming Soon)

| Shortcut | Action         |
| -------- | -------------- |
| `/`      | Focus search   |
| `?`      | Show shortcuts |
| `E`      | Export CSV     |
| `C`      | Copy emails    |

## Troubleshooting

### Dashboard Blank?

- Check if you have admin role
- Clear browser cache
- Refresh page

### Emails not showing?

- Verify RLS policies in Supabase
- Check database migration ran
- Ensure students have logged in

### Export not working?

- Try different browser
- Check browser permissions
- Ensure no popup blockers

### Can't add admins?

- Verify Supabase project access
- Check SQL syntax
- Ensure user exists in auth.users

## Best Practices

✅ **Do:**

- Check dashboard weekly
- Monitor at-risk students
- Send encouragement emails
- Export data for records
- Use filters for targeted outreach

❌ **Don't:**

- Share student data publicly
- Delete records from UI
- Use emails without consent
- Forget to provide feedback
- Ignore long-inactive students

## Tips & Tricks

1. **Sort by Last Login to find inactive students**
2. **Filter by phase to track cohort progression**
3. **Export weekly for trend analysis**
4. **Use Copy Emails before drafting message**
5. **Check "Active This Week" stat daily**
6. **Share progress screenshots with colleagues**

## Support

- 📖 See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for feature details
- 📚 See [README.md](./README.md) for overview
- 🔧 See [SETUP.md](./SETUP.md) for technical help

---

**Last Updated**: May 21, 2026  
**Version**: 1.0  
**Admin Dashboard Status**: ✅ Ready
