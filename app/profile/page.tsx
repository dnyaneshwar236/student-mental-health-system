"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  User,
  Settings,
  Shield,
  Bell,
  Camera,
  Save,
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPersonalInfo, setShowPersonalInfo] = useState(true)

  // Mock user data - in real app this would come from API
  const [userData, setUserData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    university: "State University",
    yearOfStudy: "junior",
    major: "Psychology",
    dateOfBirth: "1999-03-15",
    bio: "Psychology major passionate about mental health advocacy. Looking to connect with others who share similar interests in wellness and personal growth.",
    avatar: "/student-avatar.png",
    joinDate: "September 2024",
    location: "Campus Housing, Building A",
    emergencyContact: {
      name: "Mary Johnson",
      relationship: "Mother",
      phone: "+1 (555) 987-6543",
    },
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    resourceRecommendations: true,
    communityUpdates: false,
    crisisAlerts: true,
    theme: "system",
    language: "english",
    timezone: "EST",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    showEmail: false,
    showPhone: false,
    showLocation: false,
    allowPeerContact: true,
    shareProgressData: false,
    anonymousMode: false,
  })

  const handleSaveProfile = () => {
    // TODO: Implement save functionality
    console.log("Saving profile:", userData)
    setIsEditing(false)
  }

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const stats = {
    sessionsCompleted: 12,
    resourcesAccessed: 28,
    daysActive: 45,
    groupsJoined: 3,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Profile Settings</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.firstName} />
                      <AvatarFallback className="text-lg">
                        {userData.firstName[0]}
                        {userData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-muted-foreground">
                      {userData.major} • {userData.yearOfStudy}
                    </p>
                    <p className="text-sm text-muted-foreground">{userData.university}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Member since {userData.joinDate}
                  </Badge>
                </div>

                <Separator className="my-6" />

                {/* Quick Stats */}
                <div className="space-y-4">
                  <h3 className="font-medium">Your Journey</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.sessionsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.resourcesAccessed}</div>
                      <div className="text-xs text-muted-foreground">Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.daysActive}</div>
                      <div className="text-xs text-muted-foreground">Days Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.groupsJoined}</div>
                      <div className="text-xs text-muted-foreground">Groups</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Manage your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                          id="university"
                          value={userData.university}
                          onChange={(e) => setUserData((prev) => ({ ...prev, university: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Input
                          id="major"
                          value={userData.major}
                          onChange={(e) => setUserData((prev) => ({ ...prev, major: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="yearOfStudy">Year of Study</Label>
                        <Select
                          value={userData.yearOfStudy}
                          onValueChange={(value) => setUserData((prev) => ({ ...prev, yearOfStudy: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="freshman">Freshman</SelectItem>
                            <SelectItem value="sophomore">Sophomore</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="graduate">Graduate Student</SelectItem>
                            <SelectItem value="phd">PhD Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={userData.dateOfBirth}
                            onChange={(e) => setUserData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-muted" : ""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={userData.location}
                          onChange={(e) => setUserData((prev) => ({ ...prev, location: e.target.value }))}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Emergency Contact
                    </CardTitle>
                    <CardDescription>This information will only be used in case of emergency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Contact Name</Label>
                        <Input
                          id="emergencyName"
                          value={userData.emergencyContact.name}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, name: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">Relationship</Label>
                        <Input
                          id="emergencyRelationship"
                          value={userData.emergencyContact.relationship}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, relationship: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={userData.emergencyContact.phone}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            emergencyContact: { ...prev.emergencyContact, phone: e.target.value },
                          }))
                        }
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Choose how you want to receive updates and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={preferences.smsNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
                          <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                        </div>
                        <Switch
                          id="appointmentReminders"
                          checked={preferences.appointmentReminders}
                          onCheckedChange={(checked) => handlePreferenceChange("appointmentReminders", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="resourceRecommendations">Resource Recommendations</Label>
                          <p className="text-sm text-muted-foreground">Receive personalized resource suggestions</p>
                        </div>
                        <Switch
                          id="resourceRecommendations"
                          checked={preferences.resourceRecommendations}
                          onCheckedChange={(checked) => handlePreferenceChange("resourceRecommendations", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="communityUpdates">Community Updates</Label>
                          <p className="text-sm text-muted-foreground">Stay updated on peer support groups</p>
                        </div>
                        <Switch
                          id="communityUpdates"
                          checked={preferences.communityUpdates}
                          onCheckedChange={(checked) => handlePreferenceChange("communityUpdates", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="crisisAlerts">Crisis Alerts</Label>
                          <p className="text-sm text-muted-foreground">Important safety notifications (recommended)</p>
                        </div>
                        <Switch
                          id="crisisAlerts"
                          checked={preferences.crisisAlerts}
                          onCheckedChange={(checked) => handlePreferenceChange("crisisAlerts", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      App Preferences
                    </CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select
                          value={preferences.theme}
                          onValueChange={(value) => handlePreferenceChange("theme", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) => handlePreferenceChange("language", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="mandarin">Mandarin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => handlePreferenceChange("timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="CST">Central Time (CST)</SelectItem>
                          <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>Control who can see your information and how it's used</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profileVisibility">Profile Visibility</Label>
                        <Select
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Visible to all users</SelectItem>
                            <SelectItem value="peers">Peers Only - Visible to other students</SelectItem>
                            <SelectItem value="private">Private - Only visible to counselors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showEmail">Show Email Address</Label>
                          <p className="text-sm text-muted-foreground">Allow others to see your email</p>
                        </div>
                        <Switch
                          id="showEmail"
                          checked={privacySettings.showEmail}
                          onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showPhone">Show Phone Number</Label>
                          <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                        </div>
                        <Switch
                          id="showPhone"
                          checked={privacySettings.showPhone}
                          onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showLocation">Show Location</Label>
                          <p className="text-sm text-muted-foreground">Allow others to see your location</p>
                        </div>
                        <Switch
                          id="showLocation"
                          checked={privacySettings.showLocation}
                          onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowPeerContact">Allow Peer Contact</Label>
                          <p className="text-sm text-muted-foreground">Let other students contact you directly</p>
                        </div>
                        <Switch
                          id="allowPeerContact"
                          checked={privacySettings.allowPeerContact}
                          onCheckedChange={(checked) => handlePrivacyChange("allowPeerContact", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="shareProgressData">Share Progress Data</Label>
                          <p className="text-sm text-muted-foreground">Help improve services with anonymous data</p>
                        </div>
                        <Switch
                          id="shareProgressData"
                          checked={privacySettings.shareProgressData}
                          onCheckedChange={(checked) => handlePrivacyChange("shareProgressData", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="anonymousMode">Anonymous Mode</Label>
                          <p className="text-sm text-muted-foreground">Hide your identity in group discussions</p>
                        </div>
                        <Switch
                          id="anonymousMode"
                          checked={privacySettings.anonymousMode}
                          onCheckedChange={(checked) => handlePrivacyChange("anonymousMode", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-muted/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>• All personal information is encrypted and stored securely</p>
                      <p>• Your data is never shared without explicit consent</p>
                      <p>• You can request data deletion at any time</p>
                      <p>• We comply with FERPA and HIPAA privacy standards</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Account Security
                    </CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Login Sessions</h4>
                          <p className="text-sm text-muted-foreground">Manage active sessions</p>
                        </div>
                        <Button variant="outline">View Sessions</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Download Your Data</h4>
                          <p className="text-sm text-muted-foreground">Export your personal information</p>
                        </div>
                        <Button variant="outline">Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                      <Trash2 className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription className="text-red-600 dark:text-red-400">
                      These actions cannot be undone
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-white dark:bg-gray-900">
                        <div>
                          <h4 className="font-medium text-red-700 dark:text-red-300">Deactivate Account</h4>
                          <p className="text-sm text-red-600 dark:text-red-400">Temporarily disable your account</p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Deactivate
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-white dark:bg-gray-900">
                        <div>
                          <h4 className="font-medium text-red-700 dark:text-red-300">Delete Account</h4>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
