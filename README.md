# Toufique's 3D Portfolio

An interactive portfolio for Toufique Sheikh, combining 3D visuals, motion design, and modern web development. The site presents my skills, coding activity, selected projects, and contact details in one responsive experience.

## Highlights

- Interactive 3D scenes powered by React Three Fiber and Three.js
- Animated page sections and project cards with Framer Motion
- Responsive layouts for desktop, tablet, and mobile screens
- Live GitHub profile statistics and repository data
- LeetCode activity displayed alongside GitHub metrics
- Contact form integration through EmailJS
- Local 3D assets for the jellyfish and Saturn experiences

## Built With

- React 18
- Vite
- Three.js
- React Three Fiber and Drei
- Framer Motion
- styled-components
- React Hook Form
- EmailJS

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/TOUFIQUE2004/3-d-portfolio.git
cd 3-d-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually [`http://localhost:5173`](http://localhost:5173).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project Structure

```text
src/
├── components/     # Portfolio sections and 3D experiences
├── data/           # Shared portfolio content
├── utils/          # Theme and motion helpers
├── App.jsx         # Main page composition
└── main.jsx        # Application entry point
public/             # Models, textures, and other static assets
```

## GitHub Data

The projects and profile statistics sections request public data from the GitHub API for [`TOUFIQUE2004`](https://github.com/TOUFIQUE2004). API availability, rate limits, and network access can affect the information shown in those sections.

## Contributing

Suggestions and improvements are welcome. To contribute:

1. Open an issue describing the change or problem.
2. Create a focused branch for your work.
3. Submit a pull request with a clear description and validation steps.

## Assets and Licensing

This repository includes third-party 3D assets and textures. Refer to the license files inside `public/` and its asset directories before reusing them outside this project.

## Contact

- Email: [toufiques236@gmail.com](mailto:toufiques236@gmail.com)
- LinkedIn: [Md Toufique Sheikh](https://www.linkedin.com/in/md-toufique-sheikh-a01063295/)
- GitHub: [TOUFIQUE2004](https://github.com/TOUFIQUE2004)

Thanks for visiting and exploring the portfolio.
