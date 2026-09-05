import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { usePageViews } from "./hooks/usePageViews";
import { useSeo } from "./hooks/useSeo";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SupaShopperCaseStudy from "./pages/SupaShopperCaseStudy";
import TuzidiCaseStudy from "./pages/TuzidiCaseStudy";

/*
Design Philosophy Reminder — App Shell
Editorial Noir with Electric Lime Accents across both themes. Default to light for accessibility,
but preserve switchable dark mode with consistent semantic colors.
*/

function Router() {
  // Order matters: the head is updated before the page view is reported, so analytics
  // records the title of the page being entered rather than the one being left.
  useSeo();
  usePageViews();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/tuzidi" component={TuzidiCaseStudy} />
      <Route path="/work/supashopper" component={SupaShopperCaseStudy} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
