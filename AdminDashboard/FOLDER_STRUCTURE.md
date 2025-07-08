# Admin Dashboard - Folder Structure

## Overview
The project has been reorganized to separate reusable components from page components for better maintainability and scalability.

## New Structure

```
src/
├── components/           # Reusable UI components
│   ├── ActionButtons.jsx
│   ├── BottomSection.jsx
│   ├── ChartsSection.jsx
│   ├── EditDataModal.jsx
│   ├── Header.jsx
│   ├── MainContent.jsx
│   ├── Sidebar.jsx
│   └── StatsCards.jsx
├── pages/               # Page components (each in its own folder)
│   ├── Dashboard/
│   │   └── index.jsx
│   ├── DataManagement/
│   │   └── index.jsx
│   ├── Districts/
│   │   └── index.jsx
│   ├── Programs/
│   │   └── index.jsx
│   ├── Reports/
│   │   └── index.jsx
│   └── Users/
│       └── index.jsx
├── assets/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Component Categories

### Reusable Components (`/components`)
These are UI components that can be used across multiple pages:
- **ActionButtons.jsx** - Reusable action button components
- **BottomSection.jsx** - Bottom section layout component
- **ChartsSection.jsx** - Chart display components
- **EditDataModal.jsx** - Modal for editing data entries
- **Header.jsx** - Application header component
- **MainContent.jsx** - Main content area layout
- **Sidebar.jsx** - Navigation sidebar component
- **StatsCards.jsx** - Statistics card components

### Page Components (`/pages`)
Each page has its own folder with an `index.jsx` file:
- **Dashboard/** - Main dashboard page (contains routing logic)
- **DataManagement/** - Data management interface
- **Districts/** - Districts overview and analytics
- **Programs/** - Programs management and statistics
- **Reports/** - Reports generation and viewing
- **Users/** - User management interface

## Import Patterns

### From Pages to Components
```javascript
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import StatsCards from '../../components/StatsCards'
```

### From Pages to Other Pages (in Dashboard)
```javascript
import DataManagement from '../DataManagement'
import Programs from '../Programs'
import DistrictsPage from '../Districts'
```

### From App.jsx to Pages
```javascript
import Dashboard from './pages/Dashboard'
```

## Benefits of This Structure

1. **Clear Separation of Concerns**: Components vs Pages are clearly separated
2. **Reusability**: Components can be easily imported and reused across pages
3. **Scalability**: Easy to add new pages or components
4. **Maintainability**: Each page is in its own folder, making it easy to locate and maintain
5. **Consistency**: All pages follow the same folder structure pattern

## Usage Guidelines

- **Components**: Place reusable UI elements in `/components`
- **Pages**: Create a new folder in `/pages` for each new page with an `index.jsx` file
- **Imports**: Use relative imports following the patterns shown above
- **Naming**: Use PascalCase for component files and folders
