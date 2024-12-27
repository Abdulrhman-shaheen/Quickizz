
export async function getUser(url: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

