"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Shield, AlertTriangle, RefreshCw, Check, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SecuritySettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordMinLength: "8",
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    enableCaptcha: true,
    enableIpBlocking: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/settings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Security Settings</h1>
            <p className="text-lg text-indigo-700">Configure security and authentication settings</p>
          </div>
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

      <div className="space-y-6">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Authentication Settings</CardTitle>
            <CardDescription>Configure how users authenticate to your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-indigo-100">
                  <Shield className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require two-factor authentication for all users</p>
                </div>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Password Requirements</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Select
                    value={securitySettings.passwordMinLength}
                    onValueChange={(value) => handleSelectChange("passwordMinLength", value)}
                  >
                    <SelectTrigger id="passwordMinLength">
                      <SelectValue placeholder="Select minimum length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="10">10 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
                  <Switch
                    id="passwordRequireUppercase"
                    checked={securitySettings.passwordRequireUppercase}
                    onCheckedChange={(checked) => handleSwitchChange("passwordRequireUppercase", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
                  <Switch
                    id="passwordRequireNumbers"
                    checked={securitySettings.passwordRequireNumbers}
                    onCheckedChange={(checked) => handleSwitchChange("passwordRequireNumbers", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordRequireSymbols">Require Special Characters</Label>
                  <Switch
                    id="passwordRequireSymbols"
                    checked={securitySettings.passwordRequireSymbols}
                    onCheckedChange={(checked) => handleSwitchChange("passwordRequireSymbols", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Session Settings</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    min="5"
                    value={securitySettings.sessionTimeout}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Users will be logged out after this period of inactivity
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Authentication Settings"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Security Protections</CardTitle>
            <CardDescription>Configure security measures to protect your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                <Select
                  value={securitySettings.maxLoginAttempts}
                  onValueChange={(value) => handleSelectChange("maxLoginAttempts", value)}
                >
                  <SelectTrigger id="maxLoginAttempts">
                    <SelectValue placeholder="Select maximum attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Account will be temporarily locked after this many failed attempts
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                <p className="text-sm text-muted-foreground">
                  Require CAPTCHA verification on login and registration forms
                </p>
              </div>
              <Switch
                id="enableCaptcha"
                checked={securitySettings.enableCaptcha}
                onCheckedChange={(checked) => handleSwitchChange("enableCaptcha", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableIpBlocking">Enable IP Blocking</Label>
                <p className="text-sm text-muted-foreground">Automatically block suspicious IP addresses</p>
              </div>
              <Switch
                id="enableIpBlocking"
                checked={securitySettings.enableIpBlocking}
                onCheckedChange={(checked) => handleSwitchChange("enableIpBlocking", checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Security Settings"}
              </Button>
              <Button variant="outline" className="text-red-500">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Security Audit</CardTitle>
            </div>
            <CardDescription>Review security recommendations for your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-md">
                <div className="p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Password requirements are strong</p>
                  <p className="text-sm text-green-700">Your password policy meets security standards</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
                <div className="p-1 rounded-full bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800">Two-factor authentication is disabled</p>
                  <p className="text-sm text-amber-700">
                    We recommend enabling two-factor authentication for enhanced security
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
                <div className="p-1 rounded-full bg-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800">Session timeout is set to 30 minutes</p>
                  <p className="text-sm text-amber-700">
                    Consider reducing session timeout to 15 minutes for better security
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Run Security Audit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
