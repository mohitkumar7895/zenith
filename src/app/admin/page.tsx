'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProjectCaseStudy, ContactLead } from '@/models/types';
import {
  LayoutDashboard,
  FolderKanban,
  Building2,
  Briefcase,
  Inbox,
  LogOut,
  PlusCircle,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
  ArrowLeft,
  Database,
  TrendingUp,
  Tag,
  Sparkles,
  Lock,
  UserPlus,
  LogIn,
  Search,
  RefreshCw,
  MapPin,
  Clock,
  Upload,
  X,
  BookOpen,
  Shield,
  ShieldCheck,
  KeyRound,
  Pencil,
} from 'lucide-react';

interface BrandItem {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  category?: string;
  createdAt?: string;
}

interface CareerItem {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
  description: string;
  createdAt?: string;
}

interface BlogItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
  summary: string;
  content?: string;
  tags: string[];
  createdAt?: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function AdminPage() {
  const { theme, toggleTheme } = useApp();

  // Authentication State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Active Sidebar Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'brands' | 'careers' | 'blogs' | 'leads' | 'security'>('overview');

  // Data states
  const [projects, setProjects] = useState<ProjectCaseStudy[]>([]);
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [allAdmins, setAllAdmins] = useState<AdminUser[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Project Form & Edit State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projIndustry, setProjIndustry] = useState('');
  const [projCategory, setProjCategory] = useState('Web Platforms');
  const [projSummary, setProjSummary] = useState('');
  const [projImage, setProjImage] = useState('/services/web-dev.jpg');
  const [projTags, setProjTags] = useState('Next.js 16, MySQL, Cloud, Tailwind CSS');
  const [savingProject, setSavingProject] = useState(false);

  // Brand Form & Edit State
  const [editingBrandId, setEditingBrandId] = useState<number | null>(null);
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [brandLogoUrl, setBrandLogoUrl] = useState('');
  const [brandCategory, setBrandCategory] = useState('Technology');
  const [brandWebsite, setBrandWebsite] = useState('https://');
  const [savingBrand, setSavingBrand] = useState(false);
  const [uploadingBrandLogo, setUploadingBrandLogo] = useState(false);
  const [uploadingProjImage, setUploadingProjImage] = useState(false);

  // Career Form & Edit State
  const [editingCareerId, setEditingCareerId] = useState<number | null>(null);
  const [careerTitle, setCareerTitle] = useState('');
  const [careerDept, setCareerDept] = useState('Engineering');
  const [careerLoc, setCareerLoc] = useState('Remote (India)');
  const [careerType, setCareerType] = useState('Full-Time');
  const [careerTags, setCareerTags] = useState('Next.js 16, React 19, TypeScript, MySQL');
  const [careerDesc, setCareerDesc] = useState('');
  const [savingCareer, setSavingCareer] = useState(false);

  // Blog Form & Edit State
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Web Engineering');
  const [blogAuthor, setBlogAuthor] = useState('Zenith Tech Team');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogImage, setBlogImage] = useState('/services/web-dev.jpg');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('Next.js 16, Web Architecture, MySQL');
  const [savingBlog, setSavingBlog] = useState(false);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);

  // Change Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Sub-Admin Management Form
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'superadmin' | 'editor'>('admin');
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Global notification banner
  const [notifyMsg, setNotifyMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check persistent admin session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zenith_admin_session');
      if (saved) {
        setAdminUser(JSON.parse(saved));
      }
    } catch { }
  }, []);

  // Fetch all administrative data
  const refreshAllData = async () => {
    setLoadingData(true);
    try {
      // 1. Projects
      const pRes = await fetch('/api/projects');
      const pData = await pRes.json();
      if (pData.success && Array.isArray(pData.projects)) {
        setProjects(pData.projects);
      }

      // 2. Brands
      const bRes = await fetch('/api/brands');
      const bData = await bRes.json();
      if (bData.success && Array.isArray(bData.brands)) {
        setBrands(bData.brands);
      }

      // 3. Careers
      const cRes = await fetch('/api/careers');
      const cData = await cRes.json();
      if (cData.success && Array.isArray(cData.careers)) {
        setCareers(cData.careers);
      }

      // 4. Leads
      const lRes = await fetch('/api/contact');
      const lData = await lRes.json();
      if (lData.success && Array.isArray(lData.leads)) {
        setLeads(lData.leads);
      }

      // 5. Blogs
      const blRes = await fetch('/api/blogs');
      const blData = await blRes.json();
      if (blData.success && Array.isArray(blData.blogs)) {
        setBlogs(blData.blogs);
      }

      // 6. Admins
      const adRes = await fetch('/api/admin/auth');
      const adData = await adRes.json();
      if (adData.success && Array.isArray(adData.admins)) {
        setAllAdmins(adData.admins);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      refreshAllData();
    }
  }, [adminUser]);

  // Auth Handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: authEmail,
          password: authPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.message || 'Authentication failed. Please try again.');
        return;
      }

      setAdminUser(data.admin);
      localStorage.setItem('zenith_admin_session', JSON.stringify(data.admin));
    } catch {
      setAuthError('Connection error contacting authentication server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('zenith_admin_session');
  };

  // Direct image file uploader for Project Showcase, Brand Logos, and Blogs
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'brand' | 'project' | 'blog'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (target === 'brand') setUploadingBrandLogo(true);
    else if (target === 'project') setUploadingProjImage(true);
    else setUploadingBlogImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (target === 'brand') {
          setBrandLogoUrl(data.url);
        } else if (target === 'project') {
          setProjImage(data.url);
        } else {
          setBlogImage(data.url);
        }
        setNotifyMsg({
          type: 'success',
          text: `Image "${file.name}" uploaded successfully!`,
        });
      } else {
        setNotifyMsg({
          type: 'error',
          text: data.message || 'Image upload failed.',
        });
      }
    } catch {
      setNotifyMsg({
        type: 'error',
        text: 'Network error uploading image file.',
      });
    } finally {
      if (target === 'brand') setUploadingBrandLogo(false);
      else if (target === 'project') setUploadingProjImage(false);
      else setUploadingBlogImage(false);
    }
  };

  // Add or Update Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    setNotifyMsg(null);

    const isEditing = editingProjectId !== null;
    const impactMetrics: { label: string; value: string }[] = [];
    const tagsArray = projTags.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isEditing ? { id: editingProjectId } : {}),
          title: projTitle,
          clientIndustry: projIndustry,
          category: projCategory,
          summary: projSummary,
          imageUrl: projImage,
          impactMetrics,
          tags: tagsArray,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({
          type: 'success',
          text: isEditing
            ? `Project "${projTitle}" updated successfully!`
            : `Project "${projTitle}" saved to MySQL and live on website!`,
        });
        setEditingProjectId(null);
        setProjTitle('');
        setProjIndustry('');
        setProjSummary('');
        setProjImage('/services/web-dev.jpg');
        setProjTags('Next.js 16, MySQL, Cloud, Tailwind CSS');
        refreshAllData();
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Error saving project.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Network error saving project to MySQL.' });
    } finally {
      setSavingProject(false);
    }
  };

  const handleStartEditProject = (proj: ProjectCaseStudy) => {
    setEditingProjectId(String(proj.id));
    setProjTitle(proj.title);
    setProjIndustry(proj.clientIndustry);
    setProjSummary(proj.summary);
    if (proj.imageUrl) setProjImage(proj.imageUrl);
    if (Array.isArray(proj.tags)) setProjTags(proj.tags.join(', '));
    const formElement = document.getElementById('project-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setProjTitle('');
    setProjIndustry('');
    setProjSummary('');
    setProjImage('/services/web-dev.jpg');
    setProjTags('Next.js 16, MySQL, Cloud, Tailwind CSS');
  };

  const handleDeleteProject = async (id: string | number, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (editingProjectId === String(id)) {
          handleCancelEditProject();
        }
        setNotifyMsg({ type: 'success', text: `Project "${title}" deleted.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error deleting project.' });
    }
  };

  // Add or Update Brand
  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;
    setSavingBrand(true);
    setNotifyMsg(null);

    const isEditing = editingBrandId !== null;

    try {
      const res = await fetch('/api/brands', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isEditing ? { id: editingBrandId } : {}),
          name: brandName,
          description: brandDescription,
          logoUrl: brandLogoUrl,
          category: brandCategory,
          websiteUrl: brandWebsite,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({
          type: 'success',
          text: isEditing
            ? `Brand "${brandName}" updated successfully!`
            : `Brand "${brandName}" added to MySQL and live on website!`,
        });
        setEditingBrandId(null);
        setBrandName('');
        setBrandDescription('');
        setBrandLogoUrl('');
        setBrandCategory('Technology');
        setBrandWebsite('https://');
        refreshAllData();
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Error saving brand.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error connecting to database server.' });
    } finally {
      setSavingBrand(false);
    }
  };

  const handleStartEditBrand = (brand: BrandItem) => {
    setEditingBrandId(brand.id);
    setBrandName(brand.name);
    setBrandDescription(brand.description || '');
    setBrandLogoUrl(brand.logoUrl || '');
    setBrandCategory(brand.category || 'Technology');
    setBrandWebsite(brand.websiteUrl || 'https://');
    const formElement = document.getElementById('brand-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEditBrand = () => {
    setEditingBrandId(null);
    setBrandName('');
    setBrandDescription('');
    setBrandLogoUrl('');
    setBrandCategory('Technology');
    setBrandWebsite('https://');
  };

  // Delete Brand
  const handleDeleteBrand = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete brand "${name}"?`)) return;
    try {
      const res = await fetch(`/api/brands?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (editingBrandId === id) {
          handleCancelEditBrand();
        }
        setNotifyMsg({ type: 'success', text: `Brand "${name}" removed from website.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error deleting brand.' });
    }
  };

  // Add or Update Career
  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerTitle || !careerDesc) return;
    setSavingCareer(true);
    setNotifyMsg(null);

    const isEditing = editingCareerId !== null;
    const tagsArray = careerTags.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/careers', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isEditing ? { id: editingCareerId } : {}),
          title: careerTitle,
          department: careerDept,
          location: careerLoc,
          type: careerType,
          tags: tagsArray,
          description: careerDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({
          type: 'success',
          text: isEditing
            ? `Job opening "${careerTitle}" updated successfully!`
            : `Job opening "${careerTitle}" posted and live on Careers page!`,
        });
        setEditingCareerId(null);
        setCareerTitle('');
        setCareerDesc('');
        refreshAllData();
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Error saving job opening.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error connecting to database server.' });
    } finally {
      setSavingCareer(false);
    }
  };

  const handleStartEditCareer = (job: CareerItem) => {
    setEditingCareerId(job.id);
    setCareerTitle(job.title);
    setCareerDept(job.department);
    setCareerLoc(job.location);
    setCareerType(job.type);
    setCareerDesc(job.description);
    if (Array.isArray(job.tags)) setCareerTags(job.tags.join(', '));
    const formElement = document.getElementById('career-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEditCareer = () => {
    setEditingCareerId(null);
    setCareerTitle('');
    setCareerDesc('');
  };

  // Delete Career
  const handleDeleteCareer = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete position "${title}"?`)) return;
    try {
      const res = await fetch(`/api/careers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (editingCareerId === id) {
          handleCancelEditCareer();
        }
        setNotifyMsg({ type: 'success', text: `Job opening "${title}" removed from Careers page.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error deleting job opening.' });
    }
  };

  // Add or Update Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary) return;
    setSavingBlog(true);
    setNotifyMsg(null);

    const isEditing = editingBlogId !== null;
    const tagsArray = blogTags.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/blogs', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isEditing ? { id: editingBlogId } : {}),
          title: blogTitle,
          category: blogCategory,
          author: blogAuthor,
          readTime: blogReadTime,
          image: blogImage,
          summary: blogSummary,
          content: blogContent || blogSummary,
          tags: tagsArray,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({
          type: 'success',
          text: isEditing
            ? `Blog article "${blogTitle}" updated successfully!`
            : `Blog article "${blogTitle}" published live on website!`,
        });
        setEditingBlogId(null);
        setBlogTitle('');
        setBlogSummary('');
        setBlogContent('');
        refreshAllData();
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Error saving blog article.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error connecting to database server.' });
    } finally {
      setSavingBlog(false);
    }
  };

  const handleStartEditBlog = (b: BlogItem) => {
    setEditingBlogId(b.id);
    setBlogTitle(b.title);
    setBlogCategory(b.category);
    setBlogAuthor(b.author || 'Zenith Tech Team');
    setBlogReadTime(b.readTime || '5 min read');
    setBlogImage(b.image || '/services/web-dev.jpg');
    setBlogSummary(b.summary);
    setBlogContent(b.content || b.summary);
    if (Array.isArray(b.tags)) setBlogTags(b.tags.join(', '));
    const formElement = document.getElementById('blog-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
  };

  // Delete Blog
  const handleDeleteBlog = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete blog article "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (editingBlogId === id) {
          handleCancelEditBlog();
        }
        setNotifyMsg({ type: 'success', text: `Blog article "${title}" deleted from database.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error deleting blog article.' });
    }
  };

  // Leads Handlers
  const handleDeleteLead = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete lead from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setNotifyMsg({ type: 'success', text: `Lead from "${name}" deleted successfully.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error deleting lead.' });
    }
  };

  const handleUpdateLeadStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setNotifyMsg({ type: 'success', text: `Lead status updated to ${newStatus}.` });
        refreshAllData();
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error updating lead status.' });
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      setNotifyMsg({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }
    if (newPassword.length < 5) {
      setNotifyMsg({ type: 'error', text: 'New password must be at least 5 characters long.' });
      return;
    }

    setChangingPassword(true);
    setNotifyMsg(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          adminId: adminUser?.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({ type: 'success', text: 'Password successfully changed! Keep your new password safe.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Failed to update password.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Connection error changing password.' });
    } finally {
      setChangingPassword(false);
    }
  };

  // Create Sub-Admin / Assign Authority
  const handleCreateSubAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail || !newAdminPassword) return;

    setCreatingAdmin(true);
    setNotifyMsg(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_admin',
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotifyMsg({ type: 'success', text: data.message });
        setNewAdminName('');
        setNewAdminEmail('');
        setNewAdminPassword('');
        refreshAllData();
      } else {
        setNotifyMsg({ type: 'error', text: data.message || 'Error creating admin.' });
      }
    } catch {
      setNotifyMsg({ type: 'error', text: 'Error connecting to database server.' });
    } finally {
      setCreatingAdmin(false);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: AUTHENTICATION SCREEN (LOGIN / REGISTER)
  // -------------------------------------------------------------
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050b1a] flex items-center justify-center p-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          {/* Top Bar with theme toggle & back link */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-orange-500 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Logo & Headline */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl p-2.5 shadow-lg mx-auto mb-3 flex items-center justify-center">
              <Image src="/logo.png" alt="Zenith" width={64} height={64} className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Zenith Admin Portal
            </h1>
          </div>

          {/* Alerts */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@zenithwebworks.io"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#060d1f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full mt-2 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In To Admin</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED DASHBOARD WITH SIDEBAR
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#040814] flex flex-col md:flex-row transition-colors duration-300 text-slate-900 dark:text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#0b152d] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0 flex flex-col justify-between">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-xl p-1 shadow-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <Image src="/logo.png" alt="Zenith" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                  ZENITH&nbsp;<span className="text-amber-500">ADMIN</span>
                </span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Management Hub
                </p>
              </div>
            </div>
          </div>

          {/* Logged in Admin Chip */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center justify-center">
              {adminUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {adminUser.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {adminUser.role.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === 'overview'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'projects'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4" />
                <span>Our Work / Portfolio</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-black/20 text-white font-mono font-bold">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'brands'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" />
                <span>Our Brands</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-black/20 text-white font-mono font-bold">
                {brands.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'careers'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Careers & Jobs</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-black/20 text-white font-mono font-bold">
                {careers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'blogs'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Blogs & Insights</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-black/20 text-white font-mono font-bold">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'leads'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Client Inquiries</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-orange-500/20 text-orange-500 font-mono font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${activeTab === 'security'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security & Authority</span>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-500/20 text-emerald-500 font-mono font-bold">
                Pass
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="w-full px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:border-orange-500 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Switch</span>
          </button>

          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            className="w-full px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Visit ↗</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 px-6 bg-white dark:bg-[#0b152d] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 dark:text-white capitalize">
              {activeTab === 'overview' && 'System Overview & Analytics'}
              {activeTab === 'projects' && 'Work & Portfolio Manager'}
              {activeTab === 'brands' && 'Our Partner Brands Manager'}
              {activeTab === 'careers' && 'Careers & Job Postings Manager'}
              {activeTab === 'leads' && 'Website Client Inquiries & Leads'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllData}
              disabled={loadingData}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
              title="Refresh Data from MySQL"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Global Notification */}
        {notifyMsg && (
          <div className="m-6 mb-0 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold shadow-sm animate-fade-in bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {notifyMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span className="text-slate-800 dark:text-slate-200">{notifyMsg.text}</span>
            </div>
            <button
              onClick={() => setNotifyMsg(null)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* TAB PANELS */}
        <div className="p-6">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Inquiries</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{leads.length}</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Stored in MySQL
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Portfolio Projects</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{projects.length}</p>
                  <p className="text-[11px] text-amber-500 mt-1 flex items-center gap-1">
                    <FolderKanban className="w-3 h-3" /> Live Showcases
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Brands</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{brands.length}</p>
                  <p className="text-[11px] text-blue-500 mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Displayed on Homepage
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Open Job Openings</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{careers.length}</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> Live Careers Page
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Published Blogs</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{blogs.length}</p>
                  <p className="text-[11px] text-orange-500 mt-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Live on /blogs
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Quick Management Actions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left transition-colors cursor-pointer group"
                    >
                      <PlusCircle className="w-5 h-5 text-orange-500 mb-1.5 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Add Work</p>
                      <p className="text-[10px] text-slate-400">Portfolio</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('blogs')}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left transition-colors cursor-pointer group"
                    >
                      <BookOpen className="w-5 h-5 text-amber-500 mb-1.5 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Write Blog</p>
                      <p className="text-[10px] text-slate-400">Articles</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('brands')}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left transition-colors cursor-pointer group"
                    >
                      <Building2 className="w-5 h-5 text-blue-500 mb-1.5 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Add Brand</p>
                      <p className="text-[10px] text-slate-400">Clients</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('security')}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left transition-colors cursor-pointer group"
                    >
                      <KeyRound className="w-5 h-5 text-emerald-500 mb-1.5 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Password</p>
                      <p className="text-[10px] text-slate-400">Security</p>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Inquiries</h3>
                    <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-orange-500 hover:underline">
                      View All →
                    </button>
                  </div>
                  {leads.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No inquiries logged yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {leads.slice(0, 3).map((lead, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{lead.fullName}</p>
                            <p className="text-[11px] text-slate-400">{lead.serviceRequired}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                            {lead.budgetRange || 'Growth'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              {/* Add or Edit Project Card */}
              <div
                id="project-form-card"
                className={`p-6 rounded-2xl bg-white dark:bg-[#0b152d] border transition-all shadow-xs ${
                  editingProjectId
                    ? 'border-amber-400 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {editingProjectId ? (
                      <Pencil className="w-5 h-5 text-amber-500" />
                    ) : (
                      <PlusCircle className="w-5 h-5 text-orange-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingProjectId ? 'Edit Showcase Project' : 'Publish New Work / Showcase Project'}</span>
                        {editingProjectId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            Editing ID: {editingProjectId}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {editingProjectId
                          ? 'Modify project details, tags, and showcase imagery'
                          : 'Saves project to MySQL and renders live on website'}
                      </p>
                    </div>
                  </div>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. Next-Gen FinTech Portal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Client / Industry *
                      </label>
                      <input
                        type="text"
                        required
                        value={projIndustry}
                        onChange={(e) => setProjIndustry(e.target.value)}
                        placeholder="e.g. FinTech & Payments"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="Web Platforms">Web Platforms</option>
                        <option value="Android Apps">Android Apps</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Performance Growth">Performance Growth</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Project Showcase Image (Upload file directly from device)
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <label className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 active:scale-95 transition-all">
                        {uploadingProjImage ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        <span>{uploadingProjImage ? 'Uploading Image...' : 'Choose & Upload Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'project')}
                        />
                      </label>
                      <input
                        type="text"
                        value={projImage}
                        onChange={(e) => setProjImage(e.target.value)}
                        placeholder="Uploaded image URL will appear here..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    {projImage && (
                      <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-[#070e22] rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={projImage} alt="Project Preview" className="h-10 w-16 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                        <span className="text-[11px] text-slate-500 truncate max-w-xs">{projImage}</span>
                        <button
                          type="button"
                          onClick={() => setProjImage('')}
                          className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      What Did We Build & Accomplish? (Detailed Summary) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={projSummary}
                      onChange={(e) => setProjSummary(e.target.value)}
                      placeholder="Describe what was engineered, the architecture used, and results delivered for the client..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Technologies Used (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projTags}
                      onChange={(e) => setProjTags(e.target.value)}
                      placeholder="Next.js 16, MySQL, Cloudflare, Tailwind CSS"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={handleCancelEditProject}
                        className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={savingProject}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all ${
                        editingProjectId
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-orange-500/25'
                      }`}
                    >
                      {savingProject ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : editingProjectId ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <PlusCircle className="w-4 h-4" />
                      )}
                      <span>{editingProjectId ? 'Save & Update Project' : 'Save Project To Live Portfolio'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Projects List */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Active Showcase Projects ({projects.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border flex flex-col justify-between transition-all ${
                        editingProjectId === String(proj.id)
                          ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                            {proj.clientIndustry}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditProject(proj)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                editingProjectId === String(proj.id)
                                  ? 'text-amber-500 bg-amber-100 dark:bg-amber-950/60'
                                  : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                              }`}
                              title="Edit Project"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{proj.summary}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {proj.tags?.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/portfolio"
                          target="_blank"
                          className="text-[11px] font-bold text-orange-500 hover:underline flex items-center gap-1"
                        >
                          View Live ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. BRANDS TAB (MATCHING USER SCREENSHOT SPECIFICATIONS) */}
          {activeTab === 'brands' && (
            <div className="space-y-8">
              {/* Add or Edit Brand Form */}
              <div
                id="brand-form-card"
                className={`p-6 rounded-2xl bg-white dark:bg-[#0b152d] border transition-all shadow-xs ${
                  editingBrandId
                    ? 'border-amber-400 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {editingBrandId ? (
                      <Pencil className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Building2 className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingBrandId ? 'Edit Brand Details' : 'Add New Brand'}</span>
                        {editingBrandId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            Editing ID #{editingBrandId}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {editingBrandId
                          ? `Modifying "${brandName || 'Brand'}" - changes reflect immediately on website`
                          : 'Displays as Card on Homepage with Title, Description & Visit Link'}
                      </p>
                    </div>
                  </div>

                  {editingBrandId && (
                    <button
                      type="button"
                      onClick={handleCancelEditBrand}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBrand} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Brand Name * (e.g. Jan Seva Portal, Repnexa, Bhartiyebazar)
                      </label>
                      <input
                        type="text"
                        required
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Repnexa"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Brand Logo Image (Upload file directly from device)
                      </label>
                      <div className="space-y-2">
                        <label className="w-full px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20 active:scale-95 transition-all">
                          {uploadingBrandLogo ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          <span>{uploadingBrandLogo ? 'Uploading Logo...' : 'Upload Logo Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'brand')}
                          />
                        </label>
                        {brandLogoUrl && (
                          <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-[#070e22] rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 min-w-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={brandLogoUrl} alt="Logo Preview" className="h-7 max-w-[80px] object-contain rounded" />
                              <span className="text-[11px] text-slate-500 truncate max-w-[110px]">{brandLogoUrl}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setBrandLogoUrl('')}
                              className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                              title="Remove logo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Industry / Category
                      </label>
                      <input
                        type="text"
                        value={brandCategory}
                        onChange={(e) => setBrandCategory(e.target.value)}
                        placeholder="e.g. Technology, E-Commerce, Distribution"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Website Link (for &apos;Visit Website&apos; button)
                      </label>
                      <input
                        type="text"
                        value={brandWebsite}
                        onChange={(e) => setBrandWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Brand Description * (Displays on the brand card)
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={brandDescription}
                      onChange={(e) => setBrandDescription(e.target.value)}
                      placeholder="e.g. Complete IT Solutions including Software Development, Mobile Apps, Website Development, SEO and Digital Marketing."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {editingBrandId && (
                      <button
                        type="button"
                        onClick={handleCancelEditBrand}
                        className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={savingBrand}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all ${
                        editingBrandId
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/25'
                      }`}
                    >
                      {savingBrand ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : editingBrandId ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <PlusCircle className="w-4 h-4" />
                      )}
                      <span>{editingBrandId ? 'Save & Update Brand' : 'Add Brand To Homepage'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Brands Grid with edit & delete buttons */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Active Homepage Brands ({brands.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {brands.map((b) => (
                    <div
                      key={b.id}
                      className={`p-5 rounded-2xl bg-slate-50 dark:bg-[#070e22] border flex flex-col justify-between transition-all ${
                        editingBrandId === b.id
                          ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            {b.category || 'Client Brand'}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditBrand(b)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                editingBrandId === b.id
                                  ? 'text-amber-500 bg-amber-100 dark:bg-amber-950/60'
                                  : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                              }`}
                              title="Edit Brand"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBrand(b.id, b.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Brand"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {b.logoUrl && (
                          <div className="my-2 p-2 bg-white dark:bg-[#0b152d] rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center h-12">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={b.logoUrl} alt={b.name} className="max-h-8 object-contain" />
                          </div>
                        )}

                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{b.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {b.description || 'Powerful digital engineering partner.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {b.websiteUrl || 'No link'}
                        </span>
                        <a
                          href={b.websiteUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-500 hover:underline flex items-center gap-1"
                        >
                          Visit ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. CAREERS TAB */}
          {activeTab === 'careers' && (
            <div className="space-y-8">
              {/* Add or Edit Career Form */}
              <div
                id="career-form-card"
                className={`p-6 rounded-2xl bg-white dark:bg-[#0b152d] border transition-all shadow-xs ${
                  editingCareerId
                    ? 'border-amber-400 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {editingCareerId ? (
                      <Pencil className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-emerald-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingCareerId ? 'Edit Job Opening' : 'Post New Job Opening to Careers Page'}</span>
                        {editingCareerId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            Editing ID #{editingCareerId}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {editingCareerId ? `Modifying "${careerTitle || 'Position'}"` : 'Displays on public /careers page'}
                      </p>
                    </div>
                  </div>

                  {editingCareerId && (
                    <button
                      type="button"
                      onClick={handleCancelEditCareer}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveCareer} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={careerTitle}
                        onChange={(e) => setCareerTitle(e.target.value)}
                        placeholder="e.g. Senior Flutter Mobile Developer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={careerDept}
                        onChange={(e) => setCareerDept(e.target.value)}
                        placeholder="e.g. Engineering, Design, Growth"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Location / Work Mode
                      </label>
                      <input
                        type="text"
                        value={careerLoc}
                        onChange={(e) => setCareerLoc(e.target.value)}
                        placeholder="e.g. Remote (India), Hybrid"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Required Skills & Technologies (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={careerTags}
                      onChange={(e) => setCareerTags(e.target.value)}
                      placeholder="e.g. Flutter, Kotlin, Firebase, REST APIs"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Role Overview & Key Responsibilities *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={careerDesc}
                      onChange={(e) => setCareerDesc(e.target.value)}
                      placeholder="Describe what the engineer/designer will build, team expectations, and core deliverables..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {editingCareerId && (
                      <button
                        type="button"
                        onClick={handleCancelEditCareer}
                        className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={savingCareer}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all ${
                        editingCareerId
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md'
                      }`}
                    >
                      {savingCareer ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : editingCareerId ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <PlusCircle className="w-4 h-4" />
                      )}
                      <span>{editingCareerId ? 'Save & Update Job Opening' : 'Post Job Opening'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Careers List */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Currently Open Positions on Careers Page ({careers.length})
                </h3>

                <div className="space-y-4">
                  {careers.map((job) => (
                    <div
                      key={job.id}
                      className={`p-5 rounded-2xl bg-slate-50 dark:bg-[#070e22] border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                        editingCareerId === job.id
                          ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                            {job.department}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h4>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-orange-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-500" />
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href="/careers"
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
                        >
                          View Live ↗
                        </Link>
                        <button
                          onClick={() => handleStartEditCareer(job)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            editingCareerId === job.id
                              ? 'text-amber-500 bg-amber-100 dark:bg-amber-950/60'
                              : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                          }`}
                          title="Edit Position"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCareer(job.id, job.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Delete Position"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. LEADS TAB */}
          {activeTab === 'leads' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Client Inquiries & Consultation Requests ({leads.length})
                </h3>
              </div>

              {leads.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  No inquiries received yet. Inquiries from the website consultation modal and contact form appear here in real-time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Client Name</th>
                        <th className="pb-3 font-semibold">Contact</th>
                        <th className="pb-3 font-semibold">Required Service</th>
                        <th className="pb-3 font-semibold">Budget</th>
                        <th className="pb-3 font-semibold">Scope Details</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {leads.map((l, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <td className="py-3.5 pr-3 font-bold text-slate-900 dark:text-white">
                            {l.fullName}
                            {l.companyName && (
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {l.companyName}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 pr-3">
                            <a href={`mailto:${l.email}`} className="text-blue-500 hover:underline block">
                              {l.email}
                            </a>
                            {l.phoneNumber && (
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {l.phoneNumber}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 pr-3 font-semibold text-slate-800 dark:text-slate-200">
                            {l.serviceRequired}
                          </td>
                          <td className="py-3.5 pr-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                            {l.budgetRange || 'Flexible'}
                          </td>
                          <td className="py-3.5 pr-3 max-w-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {l.projectDetails}
                          </td>
                          <td className="py-3.5 pr-3">
                            <select
                              value={l.status || 'NEW'}
                              onChange={(e) => l.id && handleUpdateLeadStatus(l.id, e.target.value)}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right">
                            {l.id && (
                              <button
                                onClick={() => handleDeleteLead(l.id!, l.fullName)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 6. BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              {/* Add or Edit Blog Form Card */}
              <div
                id="blog-form-card"
                className={`p-6 rounded-2xl bg-white dark:bg-[#0b152d] border transition-all shadow-xs ${
                  editingBlogId
                    ? 'border-amber-400 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {editingBlogId ? (
                      <Pencil className="w-5 h-5 text-amber-500" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-amber-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingBlogId ? 'Edit Blog Article' : 'Publish New Blog Article'}</span>
                        {editingBlogId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            Editing ID #{editingBlogId}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {editingBlogId
                          ? `Modifying "${blogTitle || 'Article'}" - changes reflect immediately on /blogs`
                          : 'Publish live technical insights to website and search index'}
                      </p>
                    </div>
                  </div>

                  {editingBlogId && (
                    <button
                      type="button"
                      onClick={handleCancelEditBlog}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBlog} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Next.js 16 Partial Prerendering & Cloudflare Speed Playbook"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      >
                        <option value="Web Engineering">Web Engineering</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Database Engineering">Database Engineering</option>
                        <option value="SEO & Growth">SEO & Growth</option>
                        <option value="UI/UX & Design">UI/UX & Design</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="AI & Automation">AI & Automation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="Zenith Tech Team"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Read Time Estimate
                      </label>
                      <input
                        type="text"
                        value={blogReadTime}
                        onChange={(e) => setBlogReadTime(e.target.value)}
                        placeholder="e.g. 5 min read"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Featured Cover Image
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          placeholder="/services/web-dev.jpg"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                        />
                        <label className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer text-xs font-bold shrink-0">
                          {uploadingBlogImage ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'blog')}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Short Summary / Excerpt *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      placeholder="Brief overview explaining what readers will learn from this article..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Article Content (Markdown or Text)
                    </label>
                    <textarea
                      rows={5}
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write your in-depth guide, technical breakdown, code examples, or case notes here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="Next.js 16, React 19, Performance, Cloudflare"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    {editingBlogId && (
                      <button
                        type="button"
                        onClick={handleCancelEditBlog}
                        className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={savingBlog}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all ${
                        editingBlogId
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-orange-500/25'
                      }`}
                    >
                      {savingBlog ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : editingBlogId ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                      <span>{editingBlogId ? 'Save & Update Blog Post' : 'Publish Blog Post'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Blogs List */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Published Blog Posts ({blogs.length})
                  </h3>
                  <Link
                    href="/blogs"
                    target="_blank"
                    className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1"
                  >
                    <span>View Public Blogs Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {blogs.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No blogs found. Publish your first technical insight above!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map((b) => (
                      <div
                        key={b.id}
                        className={`p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border flex flex-col justify-between transition-all ${
                          editingBlogId === b.id
                            ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20 shadow-md'
                            : 'border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400">
                              {b.category}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {b.readTime || '5 min read'}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {b.title}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {b.summary}
                          </p>

                          {b.tags && b.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {b.tags.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400">
                            By {b.author || 'Zenith Team'}
                          </span>
                          <div className="flex items-center gap-2">
                            <Link
                              href="/blogs"
                              target="_blank"
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
                            >
                              Live ↗
                            </Link>
                            <button
                              onClick={() => handleStartEditBlog(b)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                editingBlogId === b.id
                                  ? 'text-amber-500 bg-amber-100 dark:bg-amber-950/60'
                                  : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                              }`}
                              title="Edit Blog"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id, b.title)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Blog"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. SECURITY & AUTHORITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Account Profile & Authority Status Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Logged-In Admin Profile & System Authority
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Admin Name</span>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">{adminUser.name}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Admin Email</span>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">{adminUser.email}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Authority</span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                        {adminUser.role || 'SUPERADMIN'}
                      </span>
                      <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Full Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Password Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <KeyRound className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Change Administrator Password
                  </h3>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 5 characters"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-orange-500/25 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Sub-Admin Authority & Team Management */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Administrator Accounts & Authority Management ({allAdmins.length})
                  </h3>
                </div>

                {/* Add Sub-Admin Form */}
                <form onSubmit={handleCreateSubAdmin} className="p-4 rounded-xl bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-slate-800 mb-6 space-y-3">
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-orange-500" />
                    <span>Create New Administrator with Delegated Authority</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={newAdminName}
                        onChange={(e) => setNewAdminName(e.target.value)}
                        placeholder="Admin Full Name"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="admin@zenithwebworks.io"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        required
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="Initial Password"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <select
                        value={newAdminRole}
                        onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'superadmin' | 'editor')}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0b152d] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-orange-500"
                      >
                        <option value="admin">Admin (Standard)</option>
                        <option value="superadmin">Superadmin (Full Control)</option>
                        <option value="editor">Editor (Content Only)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={creatingAdmin}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-amber-600 hover:bg-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {creatingAdmin ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                    <span>Add Administrator</span>
                  </button>
                </form>

                {/* Admins Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                        <th className="pb-2.5 font-semibold">ID</th>
                        <th className="pb-2.5 font-semibold">Administrator Name</th>
                        <th className="pb-2.5 font-semibold">Email</th>
                        <th className="pb-2.5 font-semibold">Authority Role</th>
                        <th className="pb-2.5 font-semibold">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {allAdmins.map((ad) => (
                        <tr key={ad.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <td className="py-2.5 font-mono text-slate-400">#{ad.id}</td>
                          <td className="py-2.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-[10px] flex items-center justify-center">
                              {ad.name.slice(0, 2).toUpperCase()}
                            </div>
                            <span>{ad.name}</span>
                          </td>
                          <td className="py-2.5 text-slate-600 dark:text-slate-300 font-mono text-[11px]">{ad.email}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                              {ad.role || 'ADMIN'}
                            </span>
                          </td>
                          <td className="py-2.5 text-slate-400 text-[11px]">
                            {ad.createdAt ? new Date(ad.createdAt).toLocaleDateString() : 'Active'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
