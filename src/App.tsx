import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RecipeList } from './components/RecipeList';
import { RecipeStep } from './components/RecipeStep';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CommunityPage } from './pages/CommunityPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useRecipeStore } from './store/recipeStore';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { supabase } from './config/supabase';

export function App() {
  const { currentRecipe, isAdminMode } = useRecipeStore();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            isAdmin: session.user.email === 'admin@example.com'
          });
        } else {
          setUser(null);
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          isAdmin: session.user.email === 'admin@example.com'
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ErrorBoundary>
          <Header />
          <div className="flex">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex w-full">
                    <Sidebar />
                    <main className="flex-1">
                      {isAdminMode && user?.isAdmin ? (
                        <AdminDashboard />
                      ) : currentRecipe ? (
                        <RecipeStep recipe={currentRecipe} />
                      ) : (
                        <RecipeList />
                      )}
                    </main>
                  </div>
                }
              />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </div>
    </Router>
  );
}