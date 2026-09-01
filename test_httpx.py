import httpx
import argparse
from typing import Any

def get_github_user(username: str) -> dict[str, Any]:
    response = httpx.get(f"https://api.github.com/users/{username}")
    data = response.json()
    print(data)
    return data

def main()-> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--username", required=True, help="The github username to research")
    args = parser.parse_args()

    get_github_user(username=args.username)
        
if __name__ == "__main__":
    main()