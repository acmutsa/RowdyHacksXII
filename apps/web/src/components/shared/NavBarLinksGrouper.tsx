import { getAllNavItems } from "@/lib/utils/server/redis";
import NavbarItem from "./NavbarItem";

const orderNav = ["Home", "About", "Location", "Partners", "Schedule ", "FAQ"]; 
// Schedule has a space because the itemMap.keys() stored it as 'Schedule ', so for it to render, it needs a space
export default async function NavBarLinksGrouper() {
	const nav = await getAllNavItems();
	const toRender: React.ReactNode[] = [];
	const itemMap = new Map(nav.items.map((item) => [item.name, item]));	
	
	for (const name of orderNav) {
		const head = itemMap.get(name);
		if (head && head.enabled) {
			toRender.push(
				<NavbarItem key={head.name} link={head.url}>
					{head.name}
				</NavbarItem>,
			);
		}
	}
	return <>{toRender}</>;
}

export const revalidate = 30;
