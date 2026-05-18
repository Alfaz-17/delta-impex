"use client"

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Sparkles, Copyright, Type, Brain, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    autoBackgroundRemoval: false,
    applyWatermark: true,
    watermarkText: 'Delta Impex',
    geminiModel: 'gemini-2.5-flash'
  });

  const [profile, setProfile] = useState({
    email: '',
    name: '',
    password: '',
    isDefault: false
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (res.ok && !data.error) {
        setSettings({
          autoBackgroundRemoval: data.autoBackgroundRemoval ?? false,
          applyWatermark: data.applyWatermark ?? true,
          watermarkText: data.watermarkText ?? 'Delta Impex',
          geminiModel: data.geminiModel || 'gemini-2.5-flash'
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      toast.error('Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      if (res.ok) {
        setProfile({
          email: data.email || '',
          name: data.name || '',
          password: '',
          isDefault: data.isDefault
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving technical configurations...');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        toast.success('System settings updated successfully', { id: toastId });
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to update settings', { id: toastId });
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      toast.error('An error occurred while saving settings', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleProfileSave = async () => {
    setSaving(true);
    const toastId = toast.loading('Updating security credentials...');
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name,
          password: profile.password || undefined
        })
      });

      if (res.ok) {
        toast.success('Security credentials updated successfully', { id: toastId });
        setProfile({ ...profile, password: '' });
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to update credentials', { id: toastId });
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      toast.error('An error occurred while updating profile', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </button>

      <div className="border-b border-border pb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tighter text-primary">System Infrastructure</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mt-2">
          Technical Parameters & Security Configuration
        </p>
      </div>

      <div className="grid gap-6">
        {/* ACCOUNT SECURITY */}
        <Card className="border-border bg-white rounded-none shadow-none">
          <CardHeader className="border-b border-border bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 text-primary">
                <Save className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Account Security</CardTitle>
                <CardDescription className="text-[10px] uppercase font-medium text-slate-400">
                  Update administrative access credentials
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">Admin Email</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="h-12 border-border bg-muted/20 rounded-none text-xs font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">Display Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Administrator"
                  className="h-12 border-border bg-muted/20 rounded-none text-xs font-bold"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    placeholder="••••••••"
                    className="h-12 border-border bg-muted/20 rounded-none text-xs font-bold pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Leave blank to keep current password</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleProfileSave}
                disabled={saving}
                variant="outline"
                className="h-12 px-8 border-primary text-primary hover:bg-primary hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Update Credentials
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI MODEL SELECTION */}
        <Card className="border-border bg-white rounded-none shadow-none">
          <CardHeader className="border-b border-border bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 text-primary">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">AI Core Engine</CardTitle>
                <CardDescription className="text-[10px] uppercase font-medium text-slate-400">
                  Select the Gemini model for content generation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-1.5 max-w-sm">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">Generation Model</Label>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose the model used for automatic product analysis. 
                  <span className="text-accent font-bold ml-1 italic">'Gemini 1.5 Flash'</span> is recommended for the fastest response and highest free-tier quota.
                </p>
              </div>
              
              <div className="w-full md:w-[320px]">
                <Select 
                  value={settings.geminiModel} 
                  onValueChange={(value) => setSettings({ ...settings, geminiModel: value })}
                >
                  <SelectTrigger className="h-12 border-border bg-muted/20 rounded-none text-xs font-bold uppercase tracking-widest">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border">
                    <SelectItem value="gemini-2.5-flash" className="text-xs font-bold uppercase py-3">Gemini 2.5 Flash (Latest/Recommended)</SelectItem>
                    <SelectItem value="gemini-2.5-pro" className="text-xs font-bold uppercase py-3">Gemini 2.5 Pro (Ultra Quality)</SelectItem>
                    <SelectItem value="gemini-1.5-flash" className="text-xs font-bold uppercase py-3">Gemini 1.5 Flash (Legacy/Stable)</SelectItem>
                    <SelectItem value="gemini-1.5-pro" className="text-xs font-bold uppercase py-3">Gemini 1.5 Pro (Legacy/High Quality)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IMAGE PROCESSING */}
        <Card className="border-border bg-white rounded-none shadow-none">
          <CardHeader className="border-b border-border bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Visual Processing</CardTitle>
                <CardDescription className="text-[10px] uppercase font-medium text-slate-400">
                  Manage automated image enhancements
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between gap-8 border-b border-slate-50 pb-6">
              <div className="space-y-1">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">Auto Background Removal</Label>
                <p className="text-xs text-slate-500">
                  Process all new uploads through client-side AI to isolate products.
                </p>
              </div>
              <Switch
                checked={settings.autoBackgroundRemoval}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackgroundRemoval: checked })}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between gap-8">
                <div className="space-y-1">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-primary">Global Watermarking</Label>
                  <p className="text-xs text-slate-500">
                    Apply consistent branding to all technical assets before storage.
                  </p>
                </div>
                <Switch
                  checked={settings.applyWatermark}
                  onCheckedChange={(checked) => setSettings({ ...settings, applyWatermark: checked })}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-accent" />
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Watermark Text Identifier</Label>
                </div>
                <Input
                  value={settings.watermarkText}
                  onChange={(e) => setSettings({ ...settings, watermarkText: e.target.value })}
                  placeholder="e.g. DELTA IMPEX"
                  disabled={!settings.applyWatermark}
                  className="max-w-md h-12 border-border bg-muted/20 rounded-none text-xs font-bold uppercase tracking-widest"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-8">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="h-14 min-w-[240px] bg-primary hover:bg-accent text-white rounded-none text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-3 animate-spin" />
              Committing Changes...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-3" />
              Commit Infrastructure Updates
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
