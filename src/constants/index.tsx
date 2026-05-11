export const DASHBOARD_TO_DO = [
	{
		key: 'pending_cars',
		label: 'Cars pending your approve / reject',
		info: (count: number) =>
			`<span style="font-size: 1.125rem; line-height: 1.75rem; font-weight: 600; color: hsl(var(--tiffany));" > ${count} </span> cars in review.`,
	},
	{
		key: 'pending_offers',
		label: 'Offers pending your approve',
		info: (count: number) =>
			`<span style="font-size: 1.125rem; line-height: 1.75rem; font-weight: 600; color: hsl(var(--tiffany));" > ${count} </span> offers in review.`,
	},
]
