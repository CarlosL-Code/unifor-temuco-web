import { withAuth } from "next-auth/middleware";

// El middleware protege la ruta /admin, requiriendo inicio de sesión
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
