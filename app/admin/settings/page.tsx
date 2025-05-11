"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Save,
  Globe,
  DollarSign,
  Mail,
  CreditCard,
  Phone,
  Wallet,
  Users,
  Palette,
  Check,
  Shield,
  UserPlus,
  User,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [adminUser, setAdminUser] = useState<any>(null)

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "E-Learning Platform",
    siteDescription: "Premium English, Kiswahili, and IT courses taught by industry experts.",
    contactEmail: "info@example.com",
    supportPhone: "+254 123 456 789",
    defaultLanguage: "english",
    enableRegistration: true,
    enablePublicCourses: true,
  })

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "usd",
    exchangeRate: "145.00",
    enableMpesa: false,
    mpesaBusinessNumber: "",
    mpesaAccountName: "",
    enableCreditCard: false,
    enablePaypal: false,
    paypalEmail: "",
  })

  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
    senderName: "",
    senderEmail: "",
    enableWelcomeEmail: true,
    enableCourseCompletionEmail: false,
    enablePaymentReceiptEmail: true,
  })

  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "default",
    enableDarkMode: false,
    primaryColor: "#4f46e5",
    secondaryColor: "#8b5cf6",
    showFooter: true,
    showSocialLinks: true,
  })

  useEffect(() => {
    // Get current admin from localStorage
    const adminUserStr = localStorage.getItem("adminUser")
    if (adminUserStr) {
      try {
        const user = JSON.parse(adminUserStr)
        setAdminUser(user)
      } catch (error) {
        console.error("Error parsing admin user:", error)
      }
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // General settings handlers
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentSelectChange = (name: string, value: string) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentSwitchChange = (name: string, checked: boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAppearanceSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppearanceSelectChange = (name: string, value: string) => {
    setAppearanceSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppearanceSwitchChange = (name: string, checked: boolean) => {
    setAppearanceSettings((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Settings</h1>
          <p className="text-lg text-indigo-700">Configure your e-learning platform</p>
        </div>
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-md"
            >
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Saved successfully</span>
            </motion.div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            {isSaving ? "Saving..." : "Save Settings"}
            {!isSaving && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Link href="/admin/settings/profile" className="block">
            <Card className="hover:border-indigo-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-500" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Update your personal information and password</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Configure user-related settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Admin</Badge>
                  <span className="font-medium">Administrator Accounts</span>
                </div>
                {adminUser?.role === "super_admin" ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/settings/admins">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Manage Admins
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <Shield className="h-4 w-4 mr-2" />
                    Super Admin Only
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Instructor</Badge>
                  <span className="font-medium">Instructor Accounts</span>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Instructors
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Student</Badge>
                  <span className="font-medium">Student Accounts</span>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic information about your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save General Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6 mt-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and currency settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select
                    value={paymentSettings.currency}
                    onValueChange={(value) => handlePaymentSelectChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="ksh">KSH (KES)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="exchangeRate">Exchange Rate (1 USD to KSH)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="exchangeRate"
                      name="exchangeRate"
                      type="number"
                      value={paymentSettings.exchangeRate}
                      onChange={handlePaymentChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Payment Methods</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-green-100">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-0.5">
                      <Label htmlFor="enableMpesa">M-Pesa</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via M-Pesa</p>
                    </div>
                  </div>
                  <Switch
                    id="enableMpesa"
                    checked={paymentSettings.enableMpesa}
                    onCheckedChange={(checked) => handlePaymentSwitchChange("enableMpesa", checked)}
                  />
                </div>

                {paymentSettings.enableMpesa && (
                  <div className="ml-9 grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="mpesaBusinessNumber">Business Number</Label>
                      <Input
                        id="mpesaBusinessNumber"
                        name="mpesaBusinessNumber"
                        value={paymentSettings.mpesaBusinessNumber}
                        onChange={handlePaymentChange}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="mpesaAccountName">Account Name</Label>
                      <Input
                        id="mpesaAccountName"
                        name="mpesaAccountName"
                        value={paymentSettings.mpesaAccountName}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-100">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-0.5">
                      <Label htmlFor="enableCreditCard">Credit/Debit Cards</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via credit/debit cards</p>
                    </div>
                  </div>
                  <Switch
                    id="enableCreditCard"
                    checked={paymentSettings.enableCreditCard}
                    onCheckedChange={(checked) => handlePaymentSwitchChange("enableCreditCard", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-indigo-100">
                      <Wallet className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="space-y-0.5">
                      <Label htmlFor="enablePaypal">PayPal</Label>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                    </div>
                  </div>
                  <Switch
                    id="enablePaypal"
                    checked={paymentSettings.enablePaypal}
                    onCheckedChange={(checked) => handlePaymentSwitchChange("enablePaypal", checked)}
                  />
                </div>

                {paymentSettings.enablePaypal && (
                  <div className="ml-9 grid gap-2">
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input
                      id="paypalEmail"
                      name="paypalEmail"
                      type="email"
                      value={paymentSettings.paypalEmail}
                      onChange={handlePaymentChange}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Payment Settings"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" min="0" max="100" step="0.01" defaultValue="16.00" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="taxName">Tax Name</Label>
                  <Input id="taxName" defaultValue="VAT" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 mt-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" name="smtpPort" value={emailSettings.smtpPort} onChange={handleEmailChange} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableWelcomeEmail">Welcome Email</Label>
                    <p className="text-sm text-muted-foreground">Send welcome email to new users</p>
                  </div>
                  <Switch
                    id="enableWelcomeEmail"
                    checked={emailSettings.enableWelcomeEmail}
                    onCheckedChange={(checked) => handleEmailSwitchChange("enableWelcomeEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableCourseCompletionEmail">Course Completion Email</Label>
                    <p className="text-sm text-muted-foreground">Send email when a student completes a course</p>
                  </div>
                  <Switch
                    id="enableCourseCompletionEmail"
                    checked={emailSettings.enableCourseCompletionEmail}
                    onCheckedChange={(checked) => handleEmailSwitchChange("enableCourseCompletionEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enablePaymentReceiptEmail">Payment Receipt Email</Label>
                    <p className="text-sm text-muted-foreground">Send receipt email after successful payment</p>
                  </div>
                  <Switch
                    id="enablePaymentReceiptEmail"
                    checked={emailSettings.enablePaymentReceiptEmail}
                    onCheckedChange={(checked) => handleEmailSwitchChange("enablePaymentReceiptEmail", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Email Settings"}
                </Button>
                <Button variant="outline">Test Email Connection</Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Welcome</Badge>
                    <span className="font-medium">Welcome Email Template</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Template
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Course</Badge>
                    <span className="font-medium">Course Completion Template</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Template
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Payment</Badge>
                    <span className="font-medium">Payment Receipt Template</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={appearanceSettings.theme}
                    onValueChange={(value) => handleAppearanceSelectChange("theme", value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableDarkMode">Enable Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Allow users to switch to dark mode</p>
                  </div>
                  <Switch
                    id="enableDarkMode"
                    checked={appearanceSettings.enableDarkMode}
                    onCheckedChange={(checked) => handleAppearanceSwitchChange("enableDarkMode", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Colors</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: appearanceSettings.primaryColor }}
                      />
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="text"
                        value={appearanceSettings.primaryColor}
                        onChange={handleAppearanceChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: appearanceSettings.secondaryColor }}
                      />
                      <Input
                        id="secondaryColor"
                        name="secondaryColor"
                        type="text"
                        value={appearanceSettings.secondaryColor}
                        onChange={handleAppearanceChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Layout Options</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showFooter">Show Footer</Label>
                    <p className="text-sm text-muted-foreground">Display footer section with links and information</p>
                  </div>
                  <Switch
                    id="showFooter"
                    checked={appearanceSettings.showFooter}
                    onCheckedChange={(checked) => handleAppearanceSwitchChange("showFooter", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showSocialLinks">Show Social Links</Label>
                    <p className="text-sm text-muted-foreground">Display social media links in header/footer</p>
                  </div>
                  <Switch
                    id="showSocialLinks"
                    checked={appearanceSettings.showSocialLinks}
                    onCheckedChange={(checked) => handleAppearanceSwitchChange("showSocialLinks", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Appearance Settings"}
                </Button>
                <Button variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  Preview Changes
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Logo & Branding</CardTitle>
              <CardDescription>Upload your logo and customize branding elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-2 block">Site Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-gray-50">
                      <Globe className="h-10 w-10 text-gray-300" />
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md border flex items-center justify-center bg-gray-50">
                      <Globe className="h-6 w-6 text-gray-300" />
                    </div>
                    <Button variant="outline">Upload Favicon</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
