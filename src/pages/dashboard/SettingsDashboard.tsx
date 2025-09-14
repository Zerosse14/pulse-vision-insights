import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Settings, User, Shield, Bell, Palette, Brain } from "lucide-react";

const SettingsDashboard = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "AI Analytics Corp"
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    autoAnalysis: true,
    dataRetention: "30days"
  });

  const [apiKeys, setApiKeys] = useState({
    openai: "",
    huggingface: "",
    anthropic: ""
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleSaveApiKeys = () => {
    toast({
      title: "API Keys updated",
      description: "Your API keys have been saved securely.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Settings</span>
      </h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
              />
            </div>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Application Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-gray-400">Receive notifications about analysis completion</p>
              </div>
              <Switch 
                checked={preferences.notifications}
                onCheckedChange={(checked) => setPreferences({...preferences, notifications: checked})}
              />
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Email Updates</Label>
                <p className="text-sm text-gray-400">Receive weekly reports via email</p>
              </div>
              <Switch 
                checked={preferences.emailUpdates}
                onCheckedChange={(checked) => setPreferences({...preferences, emailUpdates: checked})}
              />
            </div>
            
            <Separator className="bg-white/10" />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Auto Analysis</Label>
                <p className="text-sm text-gray-400">Automatically analyze uploaded content</p>
              </div>
              <Switch 
                checked={preferences.autoAnalysis}
                onCheckedChange={(checked) => setPreferences({...preferences, autoAnalysis: checked})}
              />
            </div>
            
            <Separator className="bg-white/10" />
            
            <div>
              <Label className="text-base">Data Retention</Label>
              <p className="text-sm text-gray-400 mb-2">How long to keep your analysis data</p>
              <Select value={preferences.dataRetention} onValueChange={(value) => setPreferences({...preferences, dataRetention: value})}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Model API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="openai">OpenAI API Key</Label>
              <Input 
                id="openai"
                type="password"
                placeholder="sk-..."
                value={apiKeys.openai}
                onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="huggingface">Hugging Face API Key</Label>
              <Input 
                id="huggingface"
                type="password"
                placeholder="hf_..."
                value={apiKeys.huggingface}
                onChange={(e) => setApiKeys({...apiKeys, huggingface: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="anthropic">Anthropic API Key</Label>
              <Input 
                id="anthropic"
                type="password"
                placeholder="sk-ant-..."
                value={apiKeys.anthropic}
                onChange={(e) => setApiKeys({...apiKeys, anthropic: e.target.value})}
              />
            </div>
            <Button onClick={handleSaveApiKeys}>Save API Keys</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Two-Factor Authentication</Button>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsDashboard;