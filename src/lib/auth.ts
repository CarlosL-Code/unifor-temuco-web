import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@unifortemuco.cl" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        // En un entorno real esto iría a la base de datos (con bcrypt para comprobar el hash)
        // Por ahora, usuario de prueba estático
        const user = { id: "1", name: "Admin UNIFOR", email: "admin@unifortemuco.cl" };
        
        if (credentials?.email === "admin@unifortemuco.cl" && credentials?.password === "Unifor2026!") {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
};
