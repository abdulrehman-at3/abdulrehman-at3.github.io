# CyberFolio - Abdul Rehman Tahir

> A cybersecurity-focused personal portfolio built to showcase practical projects, technical skills, certifications, experience, and ongoing growth in cybersecurity.

[![Live Portfolio](https://img.shields.io/badge/Portfolio-Live-0ea5e9?style=flat-square&logo=googlechrome&logoColor=white)](https://abdulrehman-at3.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-abdulrehman--at3-181717?style=flat-square&logo=github)](https://github.com/abdulrehman-at3)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abdul%20Rehman%20Tahir-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mabdul-rehman/)

## About the Project

CyberFolio is my personal cybersecurity portfolio and a central place to document my work, skills, projects, certifications, and professional progress.

I built it with a simple goal: make my work easy to explore while keeping the experience clean, fast, and professional. Instead of relying on a large frontend framework or a backend server, the site uses standard web technologies and lightweight JavaScript.

The portfolio brings together:

- A cybersecurity-focused introduction
- Technical skills and education
- Professional experience and achievements
- Practical cybersecurity projects
- Internship certificates and other credentials
- Resume and supporting documents
- Live GitHub information
- An interactive terminal-style interface
- Contact and social links

## Featured Projects

### PhishGuard

A Flask-based phishing email detection system focused on identifying suspicious email content using contextual analysis and security checks.

### CyberShield

A Python password security tool that analyzes password strength, entropy, common patterns, repeated characters, dictionary weaknesses, and other indicators of weak passwords.

### Encrypto

A command-line encryption and decryption toolkit that includes classical ciphers and modern authenticated encryption such as AES-GCM with password-based key derivation.

These projects are included to show practical application of cybersecurity concepts through hands-on development.

## Key Features

### Interactive Terminal

The terminal provides a different way to navigate the portfolio using commands such as:

```text
help
whoami
about
skills
projects
resume
neofetch
```

It is a guided portfolio interface, not a real command shell. It does not execute arbitrary system commands.

### Live GitHub Section

The site retrieves public GitHub profile information through the GitHub REST API and displays it directly in the portfolio.

The integration is designed to fail gracefully, so the rest of the portfolio continues to work even when GitHub data is temporarily unavailable or rate-limited.

### Certificates and Resume

Certificates, the Letter of Recommendation, and the resume are included as portfolio resources and can be viewed or opened directly from the site.

### Responsive Design

The layout is designed for both desktop and mobile screens. Interactive effects also respect the user's reduced-motion preference through `prefers-reduced-motion`.

## Technology Stack

| Area | Technology |
|---|---|
| Structure | HTML5, semantic HTML |
| Styling | CSS3, CSS custom properties, responsive CSS |
| Interactivity | Vanilla JavaScript |
| Icons | Inline SVG |
| GitHub Integration | GitHub REST API |
| Hosting | GitHub Pages, Netlify, or Vercel |

There is no frontend framework, backend, database, or build pipeline required.

## Project Structure

```text
CyberFolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── terminal.js
│   ├── github.js
│   └── certificates.js
├── assets/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── images/
│   │   └── profile.png
│   ├── resume/
│   │   └── Abdul_Rehman_Tahir_Resume.pdf
│   └── certificates/
│       ├── certificates.json
│       ├── DecodeLabs_Internship_Certificate.pdf
│       ├── Introduction to Cybersecurity Awareness.pdf
│       └── Letter_of_Recommendation.pdf
├── robots.txt
├── .nojekyll
└── README.md
```

## Run Locally

CyberFolio is a static website, so there is no dependency installation or build step.

### Using Python

```bash
cd CyberFolio
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Using VS Code

Open the project folder in Visual Studio Code and use the **Live Server** extension to launch the site.

### Using Another Static Server

Any static HTTP server can be used to serve the project files.

Running the site through a local HTTP server is recommended instead of opening `index.html` directly with `file://`, especially for browser-based GitHub API requests.

## Deployment

No build command is needed. The project can be deployed directly from the repository.

### GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository and go to **Settings -> Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the deployment branch, usually `main`.
5. Select the root folder (`/`).
6. Save the settings.

For a user site repository named:

```text
abdulrehman-at3.github.io
```

the site will normally be available at:

```text
https://abdulrehman-at3.github.io/
```

For a project repository, the URL normally follows:

```text
https://abdulrehman-at3.github.io/<repository-name>/
```

### Netlify

Connect the GitHub repository to Netlify or upload the project folder manually. No build command is required.

### Vercel

Import the repository into Vercel and deploy it as a static site. No framework or build command is required.

## Customization

Most portfolio updates can be made directly in the project files without changing the overall architecture.

### Content

Main portfolio content is stored in:

```text
index.html
```

The page is divided into clearly marked sections to make future edits easier.

### Design

Global colors, spacing, typography, and other visual values are defined near the top of:

```text
css/style.css
```

The site uses CSS custom properties so the visual system can be updated from one place.

### JavaScript

| File | Purpose |
|---|---|
| `main.js` | Navigation, page interactions, visual effects, and contact behavior |
| `terminal.js` | Interactive terminal commands and output |
| `github.js` | GitHub profile and activity data |
| `certificates.js` | Certificate data and certificate display |

### Resume

Replace the existing file at:

```text
assets/resume/Abdul_Rehman_Tahir_Resume.pdf
```

Keeping the same filename allows existing links to keep working.

### Certificates

Certificate files are stored in:

```text
assets/certificates/
```

Certificate information is maintained in:

```text
assets/certificates/certificates.json
```

When adding a new certificate, update the metadata file and add the corresponding document to the certificates folder.

## SEO and Social Sharing

The portfolio includes common SEO and social sharing elements such as:

- Canonical URL metadata
- Open Graph metadata
- Twitter/X card metadata
- Robots configuration
- Favicon support
- Social preview image

When moving the site to a different domain, update the canonical URL and social image URLs in `index.html` so search engines and social platforms point to the correct address.

## Privacy and Security

CyberFolio is a client-side static website.

- No custom backend is used.
- No database is required.
- GitHub data is limited to publicly available profile information.
- The contact form uses a `mailto:` workflow instead of a custom server.
- The terminal interface does not provide real shell access.

## Accessibility

The project includes semantic HTML, accessible labels for interactive elements, responsive layouts, and support for reduced-motion preferences.

Future changes should preserve keyboard navigation, readable contrast, meaningful link text, and useful alternative text for images.

## Development Approach

The project keeps the architecture simple on purpose:

```text
HTML -> Structure and Content
CSS  -> Design and Responsive Layout
JS   -> Interaction and Integrations
```

This makes CyberFolio easy to maintain, quick to deploy, and suitable for static hosting platforms.

## Roadmap

The portfolio will continue to evolve as I gain more practical cybersecurity experience. Future improvements may include:

- Linking each project directly to its GitHub repository
- Adding more cybersecurity projects and technical write-ups
- Publishing detailed case studies for selected projects
- Further improving accessibility, performance, and SEO
- Expanding the terminal and GitHub experiences

## Author

**Abdul Rehman Tahir**

Cybersecurity-focused Computer Science student with an interest in practical security, Python development, and building useful security tools through hands-on projects.

**GitHub:** [@abdulrehman-at3](https://github.com/abdulrehman-at3)  
**LinkedIn:** [Abdul Rehman Tahir](https://www.linkedin.com/in/mabdul-rehman/)  
**Portfolio:** [abdulrehman-at3.github.io](https://abdulrehman-at3.github.io/)  
**Email:** abdulrehman.at3.official@gmail.com

## License

This repository is a personal portfolio. The original portfolio content, personal documents, profile images, certificates, branding, and other personal materials are not intended for redistribution or reuse without permission.

Code may be reviewed or referenced for learning purposes, but the portfolio and its personal content should not be copied or presented as someone else's work.

---

<p align="center">
  Built with HTML, CSS, JavaScript, and a genuine interest in cybersecurity.
</p>
