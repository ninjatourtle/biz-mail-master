import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Contacts from "./pages/Contacts";
import Templates from "./pages/Templates";
import Replies from "./pages/Replies";
import Reports from "./pages/Reports";
import ABTesting from "./pages/ABTesting";
import TriggerCampaigns from "./pages/TriggerCampaigns";
import Segmentation from "./pages/Segmentation";
import SalesFunnels from "./pages/SalesFunnels";
import EmailValidation from "./pages/EmailValidation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
          <Route path="/campaigns/create" element={<Layout><CreateCampaign /></Layout>} />
          <Route path="/campaigns/:id" element={<Layout><CampaignDetails /></Layout>} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/templates" element={<Layout><Templates /></Layout>} />
          <Route path="/replies" element={<Layout><Replies /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/ab-testing" element={<Layout><ABTesting /></Layout>} />
          <Route path="/triggers" element={<Layout><TriggerCampaigns /></Layout>} />
          <Route path="/segmentation" element={<Layout><Segmentation /></Layout>} />
          <Route path="/funnels" element={<Layout><SalesFunnels /></Layout>} />
          <Route path="/validation" element={<Layout><EmailValidation /></Layout>} />
          <Route path="/analytics" element={<Layout><Dashboard /></Layout>} />
          <Route path="/send" element={<Layout><Dashboard /></Layout>} />
          <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
