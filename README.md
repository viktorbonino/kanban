# Kanban
Kanban board for terra-money front-end code assignment.

## Libraries used
- Vite as the build tool
- Emotion for styling
- Recoil for state management
- React beautiful dnd for managing drag and drop
- i18next and react-i18next for translations
- React Modal for modals
- Heroicons for icons
- React router for routing
- React hook form for forms and basic input validation

## Required features

- [x]  React
- [x]  Built with SPA (Single Page Application)
- [x]  Boilerplate, UI Kit can be customized according to your preference. **(i implemented light/dark themes through emotion)**

Column

- [x]  Required fields: Name, Order

Card

- [x]  Required fields: Name, Description, Created date, Status(Open, Closed), Order

General

- [x]  User can add column with name
- [x]  User can modify column name
- [x]  User can delete empty column
- [x]  User can move columns by drag & drop
- [x]  User can add card to column with name and description
- [x]  User can modify card details
- [x]  User can identify / switch status of card
- [x]  User can move / order card by drag & drop
- [x]  User can archive card

## Advanced features

- [ ]  Test codes
- [ ]  Graceful error handling

### **Structure**

- [ ]  Multiple boards
- [ ]  More fields such as author, labels, assignee, comments, protected
- [x]  i18n feature

### **PWA**

- [x]  Add to Homescreen with an icon
- [x]  Persistent storage (by any method) to preserve state after refresh **(i used localStorage)**
- [ ]  Push notification when a new card created

### **Performance**

- [ ]  Windowing list (react-window, react-virtualized) when rendering lots of cards
- [x]  Code splitting and lazy loading **(i implemented it only at route level)**

### **Design**

- [x]  RWD(Responsive Web Design) for desktop/mobile
- [x]  Show description when list is empty
- [x]  404 Page if url is not valid

### **UX**

- [x]  Auto focus on initial state
- [x]  Input Validation
