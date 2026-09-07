# Your Name — Personal Blog

A minimal personal journal about advertising measurement, built as a static Next.js site with Decap CMS.

## Publish your site

1. Create a new repository on GitHub. Give it a simple name such as `personal-blog`.
2. Upload this project to that repository. If someone is helping you, ask them to push the project for you.
3. In Netlify, choose **Add new site** and connect the GitHub repository. Keep the build settings already included in this project.
4. In the Netlify site dashboard, open **Identity**, enable Identity, then open **Services → Git Gateway** and enable it.
5. Invite yourself under **Identity → Invite users**. Accept the invitation from your email and set a password.
6. Visit `your-site-address.netlify.app/admin` and sign in. From there, choose **Articles → New Article** to publish your first post.

## Personalize the site

- Replace every `Your Name` with your name.
- Replace `https://www.linkedin.com/in/yourprofile` with your LinkedIn profile address.
- Replace the round `YN` mark in the header with a profile picture if you would like to use one. The intended replacement path is `public/images/profile.jpg`.
- Replace `https://yourdomain.com` in the metadata, sitemap, and robots settings with your live domain so search engines use the correct canonical address.

## Writing articles

Articles created in the admin area are saved as Markdown files in `content/posts`. Images uploaded through the admin area are saved in `public/images/uploads`. The site shows the five latest articles on each page and displays a calm empty state before the first article is published.
