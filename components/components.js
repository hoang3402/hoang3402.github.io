export function productItem() {
	return {
		templateUrl: '../components/product_section/product_item.html',
		bindings: {
			id: '@',
			name: '@',
			url: '@',
			comment: '@',
			views: '@',
			genres: '<',
		},
	}
}
export function viewItem() {
	return {
		templateUrl: '../components/anime_top_views/view_item.html',
		bindings: {
			id: '@',
			name: '@',
			url: '@',
			views: '@',
		},
	}
}
export function headerCustoms() {
	return {
		templateUrl: '../components/header/header.html',
		controller: 'GetGenres',
		bindings: {
			name: '@',
			url: '@',
		},
		controller: () => {
			console.log("headerCustoms load");
		}
	}
}
export function heroSlider() {
	return {
		templateUrl: '../components/hero_slider/hero_slider.html',
		bindings: {
			name: '@',
			url: '@',
		},
	}
}
export function productSection() {
	return {
		templateUrl: '../components/product_section/product_section.html',
	}
}
export function animeDetailsEpisode() {
	return {
		templateUrl:
			'../components/anime__details__episodes/anime_details_episodes.html',
		bindings: {
			listEp: '@',
		},
	}
}

export function footerCustoms() {
	return {
		templateUrl: '../components/footer/footer.html',
	}
}
export function search() {
	return {
		templateUrl: '../components/search/search.html',
	}
}
export function breadcrumb() {
	return {
		templateUrl: '../components/breadcrumb/breadcrumb.html',
	}
}
export function animeDetailsContent() {
	return {
		templateUrl: '../components/anime_details_content/anime_details_content.html',
	}
}
export function animeTopViews() {
	return {
		templateUrl: '../components/anime_top_views/anime_top_views.html',
	}
}
export function heroItem() {
	return {
		templateUrl: '../components/hero_slider/hero_items.html',
		bindings: {
			idMovie: '@',
			name: '@',
			linkImage: '@',
			description: '@',
		},
	}
}
export function trendingProduct() {
	return {
		templateUrl: '../components/product_section/trending_product.html',
		controller: 'GetListAnimeTrending',
	}
}
export function liveProduct() {
	return {
		templateUrl: '../components/product_section/live_product.html',
	}
}
export function recentProduct() {
	return {
		templateUrl: '../components/product_section/recent_product.html',
	}
}
export function popularProduct() {
	return {
		templateUrl: '../components/product_section/popular_product.html',
		controller: 'GetListAnimePopular',
	}
}
export function productSidebar() {
	return {
		templateUrl: '../components/product_section/product_sidebar.html',
	}
}
export function productSidebarComment() {
	return {
		templateUrl: '../components/product_section/product_sidebar_comment.html',
	}
}
