// This simulates a database of admin users
// In a real application, you would use a proper database
interface AdminUser {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "super_admin" | "admin"
  createdAt: Date
}

// Initial super admin - this would typically be set up during initial deployment
const INITIAL_SUPER_ADMIN: AdminUser = {
  id: "1",
  name: "Super Admin",
  email: "superadmin@example.com",
  // In a real app, this would be hashed
  password: "superadmin123",
  role: "super_admin",
  createdAt: new Date("2023-01-01"),
}

// Admin users store - initialized with the super admin
let adminUsers: AdminUser[] = [INITIAL_SUPER_ADMIN]

// Get admin by email
export function getAdminByEmail(email: string): AdminUser | undefined {
  return adminUsers.find((user) => user.email === email)
}

// Verify admin credentials
export function verifyAdminCredentials(email: string, password: string): AdminUser | null {
  const admin = getAdminByEmail(email)

  // In a real app, you would compare hashed passwords
  if (admin && admin.password === password) {
    // Don't return the password in the response
    const { password, ...adminWithoutPassword } = admin
    return adminWithoutPassword as AdminUser
  }

  return null
}

// Create a new admin (only super admins can do this)
export function createAdmin(
  creatorId: string,
  newAdmin: { name: string; email: string; password: string; role: "admin" | "super_admin" },
): AdminUser | null {
  // Check if the creator exists and is a super admin
  const creator = adminUsers.find((user) => user.id === creatorId)
  if (!creator || creator.role !== "super_admin") {
    return null
  }

  // Check if email already exists
  if (adminUsers.some((user) => user.email === newAdmin.email)) {
    return null
  }

  // Create new admin
  const admin: AdminUser = {
    ...newAdmin,
    id: (adminUsers.length + 1).toString(),
    createdAt: new Date(),
  }

  adminUsers.push(admin)

  // Don't return the password in the response
  const { password, ...adminWithoutPassword } = admin
  return adminWithoutPassword as AdminUser
}

// Get all admins
export function getAllAdmins(requestingAdminId: string): Omit<AdminUser, "password">[] {
  const requestingAdmin = adminUsers.find((admin) => admin.id === requestingAdminId)

  // Only super admins can see all admins
  if (!requestingAdmin || requestingAdmin.role !== "super_admin") {
    return []
  }

  // Return all admins without passwords
  return adminUsers.map(({ password, ...admin }) => admin)
}

// Delete an admin (only super admins can do this)
export function deleteAdmin(adminIdToDelete: string, requestingAdminId: string): boolean {
  const requestingAdmin = adminUsers.find((admin) => admin.id === requestingAdminId)

  // Only super admins can delete admins
  if (!requestingAdmin || requestingAdmin.role !== "super_admin") {
    return false
  }

  // Cannot delete yourself or the initial super admin
  if (adminIdToDelete === requestingAdminId || adminIdToDelete === "1") {
    return false
  }

  const initialLength = adminUsers.length
  adminUsers = adminUsers.filter((admin) => admin.id !== adminIdToDelete)

  return adminUsers.length < initialLength
}
