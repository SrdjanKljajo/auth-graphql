const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return
  if (requestUser.id === resourceUserId.toString()) return
  throw new Error('Not authorized to access this action')
}

module.exports = checkPermissions
