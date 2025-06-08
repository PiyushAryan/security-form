## 🛠️ Tech Stack & Design Choices

### ⚛️ React
Used for its component-based architecture, allowing clean code organisation and efficient state management—ideal for building dynamic UIs like this vulnerability report form.

### Tailwind CSS
Chosen because it provides a better developer experience by showing all the CSS directly alongside the JSX. This eliminates the need to switch between separate CSS files, making styling faster and more intuitive.

### Lucide-react
Provides a component-based icon structure that is easy to implement with React and Tailwind. It’s one of my favourites because it offers better design compatibility with Tailwind’s utility classes and a modern look.

### 🔔 React Hot Toast
Easy to use and offers pre-made notification components tailored to different message categories (success, error, warning, etc.), which helps improve user feedback with minimal setup.

### 🆔 nanoid (Why not `Math.random()` or `uuid`?)
Instead of using `Math.random()` or the more common `uuid` library, I selected `nanoid` for generating unique identifiers for each submitted report. Here's why:

I chose nanoid because it’s secure, faster, smaller than UUID, generates compact unique IDs, and lets me customise length and characters easily.
