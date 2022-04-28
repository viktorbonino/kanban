import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import themeAtom from 'state/atoms/theme'
import themes from 'ui/themes'
import GlobalStyle from 'ui/GlobalStyle'


const KanbanPage = lazy(() => import('pages/Kanban'))
const ArchivedTasks = lazy(() => import('pages/ArchivedTasks'))
const Page404 = lazy(() => import('pages/404'))


const App = () => {
  const theme = useRecoilValue(themeAtom)
  return (
    <ThemeProvider theme={theme ? themes.dark : themes.light}>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<KanbanPage />} />
          <Route path="archivedTasks" element={<ArchivedTasks />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
