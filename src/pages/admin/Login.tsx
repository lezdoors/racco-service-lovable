
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, Lock, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const from = (location.state as any)?.from || "/admin";
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null);
    
    try {
      await login(data.username, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      setLoginError(errorMessage);
      
      // If too many failed attempts, show a different message
      if (loginAttempts >= 2) {
        toast({
          title: "Trop de tentatives échouées",
          description: "Veuillez réessayer dans quelques instants ou contactez l'administrateur.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img 
                src="/logo-enedis.svg" 
                alt="Racco-Service" 
                className="h-12" 
                onError={(e) => {
                  e.currentTarget.src = "https://placeholder.co/240x80/0063AF/FFFFFF?text=RACCO-SERVICE";
                }}
              />
            </div>
            <CardTitle className="text-2xl text-center">Espace Administrateur</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous pour gérer les demandes de raccordement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {loginError}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="username"
                    placeholder="admin"
                    className="pl-10"
                    {...register("username")}
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10"
                    {...register("password")}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-enedis-blue hover:bg-blue-700 transition-colors" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <p className="text-sm text-gray-500">
              Accès réservé aux administrateurs et traiteurs
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
