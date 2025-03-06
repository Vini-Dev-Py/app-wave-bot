import { useState, KeyboardEvent, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

type LoginProps = {
    handleLoginSuccess(): void
}

export function Login({ handleLoginSuccess }: LoginProps): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = (): void => {
        if (email === "1" && password === "1") {
            handleLoginSuccess()
            navigate('/')
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            handleLoginSuccess();
            navigate('/');
        }
    }, [handleLoginSuccess, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <Card className="w-full max-w-xl p-6 bg-white shadow-2xl rounded-2xl">
                <div className="flex justify-center mb-4 object-cover">
                    WaveBot
                </div>
                <h1 className="text-2xl font-bold text-center mb-4 text-primaryText">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-textGray mb-2">
                        Email
                    </label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        className="w-full bg-inputBackground shadow-subtle"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-textGray mb-2">
                        Senha
                    </label>
                    <div className="relative">
                        <IconField iconPosition="right">
                            <InputText
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                className="w-full bg-inputBackground shadow-subtle pr-10"
                                onKeyDown={handleKeyDown}
                            />
                            <InputIcon 
                                onClick={() => setPasswordVisible(!passwordVisible)} 
                                className={twMerge("mr-1", passwordVisible ? "pi pi-eye-slash" : "pi pi-eye")} 
                            />
                        </IconField>
                    </div>
                </div>
                <Button
                    label="Entrar"
                    className="w-full bg-primaryText text-buttonText hover:bg-opacity-80"
                    onClick={handleLogin}
                />
            </Card>
        </div>
    );
}
