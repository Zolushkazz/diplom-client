import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // `localStorage` зөвхөн browser дээр ажиллана
            const token = localStorage.getItem("token");
            console.log(token);

            try {
                const response = await fetch("/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p>
                <strong>ID:</strong> {user.id}
            </p>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
        </div>
    );
}
