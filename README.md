# Tree View Component - Angular

A fully functional, feature-rich Tree View component built with Angular and TypeScript.

## 🎯 Features

### ✅ Core Features Implemented

1. **Expand / Collapse Nodes**
   - Parent nodes toggle between expanded and collapsed states
   - Icon changes dynamically (+/−) based on state

2. **Add New Node**
   - Add child nodes to any parent node
   - Prompt-based input for node names
   - Nodes can be added at root level or as children

3. **Remove Node**
   - Delete any node including its entire subtree
   - Confirmation dialog before deletion

4. **Drag & Drop Support**
   - Reorder nodes within the same level
   - Move nodes across different parent nodes
   - Visual feedback during drag operations
   - Maintains hierarchy integrity

5. **Lazy Loading**
   - Child nodes load only when parent is expanded
   - Simulates async API calls with delay
   - Loading indicator during fetch

6. **Edit Node Name**
   - Double-click on node label to edit
   - Enter to save, Escape to cancel
   - Updates label inline

7. **Clean Architecture**
   - Reusable TreeView component
   - Recursive TreeNode component
   - Centralized state management via TreeService
   - Well-defined data models
   - Minimal external dependencies

## 🏗️ Project Structure

```
tree-view-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── tree-view/          # Main container component
│   │   │   │   ├── tree-view.component.ts
│   │   │   │   ├── tree-view.component.html
│   │   │   │   └── tree-view.component.css
│   │   │   └── tree-node/          # Recursive node component
│   │   │       ├── tree-node.component.ts
│   │   │       ├── tree-node.component.html
│   │   │       └── tree-node.component.css
│   │   ├── models/
│   │   │   └── tree-node.model.ts  # Data model interface
│   │   ├── services/
│   │   │   └── tree.service.ts     # State management service
│   │   └── app.component.ts        # Root component
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation

1. **Clone or download the repository**

2. **Install dependencies**

   ```bash
   cd tree-view-angular
   npm install
   ```

3. **Run the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 📦 Build for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎮 Usage Guide

### Basic Operations

1. **Expand/Collapse**
   - Click the +/− button next to nodes that have children
   - First expansion triggers lazy loading

2. **Add Nodes**
   - Click the green "+" button to add a child node
   - Use "Add Root Node" button to add top-level nodes
   - Enter the node name in the prompt

3. **Edit Nodes**
   - Double-click on any node label
   - Type the new name
   - Press Enter to save or Escape to cancel

4. **Delete Nodes**
   - Click the red "×" button
   - Confirm deletion in the dialog
   - Entire subtree will be removed

5. **Drag & Drop**
   - Click and drag any node
   - Drop on another node to make it a child
   - Visual feedback shows valid drop zones

## 🔧 Customization

### Modify Initial Data

Edit `src/app/services/tree.service.ts`:

```typescript
private initializeData(): void {
  const initialData: TreeNode[] = [
    {
      id: '1',
      label: 'Your Root Node',
      level: 'A',
      hasChildren: true,
      isExpanded: false
    }
  ];
  this.treeDataSubject.next(initialData);
}
```

### Adjust Lazy Loading Delay

In `tree.service.ts`, modify the delay:

```typescript
loadChildren(nodeId: string): Observable<TreeNode[]> {
  // Change 500 to your desired delay in milliseconds
  return of(children).pipe(delay(500));
}
```

### Customize Styling

Modify the CSS files in the component directories:

- `tree-view.component.css` - Container and layout
- `tree-node.component.css` - Individual node appearance

## 🧪 Testing the Features

1. **Lazy Loading**: Expand a parent node and watch the "Loading..." indicator
2. **Drag & Drop**: Try moving nodes between different parents
3. **Edit**: Double-click any label and modify the text
4. **Delete**: Remove a parent node and see children removed too
5. **Add**: Create nested structures by adding multiple levels

## 📋 Technical Details

### Technologies Used

- **Angular 17** - Framework
- **TypeScript** - Language
- **RxJS** - Reactive state management
- **Angular CDK** (optional) - Drag & drop utilities
- **Standalone Components** - Modern Angular architecture

### Key Design Patterns

- **Component Composition** - TreeView contains TreeNode components
- **Recursion** - TreeNode renders itself for children
- **Service-based State** - Centralized tree operations
- **Observable Streams** - Reactive data flow
- **Immutability** - State updates create new references


### Deployment Link
- Netlify: `https://your-app.netlify.app`
- GitHub Pages: `https://github.com/Manjeetyadav29/angular-tree-view`

## 📝 Assignment Checklist

- [x] Expand/Collapse functionality
- [x] Add new nodes (with prompt input)
- [x] Remove nodes (with confirmation)
- [x] Drag & Drop support
- [x] Lazy loading simulation
- [x] Edit node names (double-click)
- [x] Angular + TypeScript implementation
- [x] Well-defined data model
- [x] Component decomposition
- [x] Clean state management
- [x] Minimal external libraries
- [x] Reusable TreeView component
- [x] Mock data with lazy loading
- [x] Clean UI with styling

## 🐛 Troubleshooting

### Port Already in Use

If port 4200 is busy:

```bash
ng serve --port 4300
```

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues

Ensure build succeeds first:

```bash
npm run build
```

## 📄 License

This project is created for educational/assignment purposes.

## 👨‍💻 Author

Created as part of an Angular development assignment.

---

**Happy Coding! 🚀**
