export const productItem = {
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

export const viewItem = {
	templateUrl: '../components/anime_top_views/view_item.html',
	bindings: {
		id: '@',
		name: '@',
		url: '@',
		views: '@',
	},
}

export const headerCustoms = {
	templateUrl: '../components/header/header.html',
	controller: 'GetGenres',
	bindings: {
		name: '@',
		url: '@',
	}
}

export const heroSlider = {
	templateUrl: '../components/hero_slider/hero_slider.html',
	bindings: {
		name: '@',
		url: '@',
	},
}

export const productSection = {
	templateUrl: '../components/product_section/product_section.html',
}

export const animeDetailsEpisode = {
	templateUrl:
		'../components/anime__details__episodes/anime_details_episodes.html',
	bindings: {
		listEp: '@',
	},
}


export const footerCustoms = {
	templateUrl: '../components/footer/footer.html',
}

export const search = {
	templateUrl: '../components/search/search.html',
}

export const breadcrumb = {
	templateUrl: '../components/breadcrumb/breadcrumb.html',
}

export const animeDetailsContent = {
	templateUrl: '../components/anime_details_content/anime_details_content.html',
}

export const animeTopViews = {
	templateUrl: '../components/anime_top_views/anime_top_views.html',
}

export const heroItem = {
	templateUrl: '../components/hero_slider/hero_items.html',
	bindings: {
		idMovie: '@',
		name: '@',
		linkImage: '@',
		description: '@',
	},
}

export const trendingProduct = {
	templateUrl: '../components/product_section/trending_product.html',
	controller: 'GetListAnimeTrending',
}

export const liveProduct = {
	templateUrl: '../components/product_section/live_product.html',
}

export const recentProduct = {
	templateUrl: '../components/product_section/recent_product.html',
}

export const popularProduct = {
	templateUrl: '../components/product_section/popular_product.html',
	controller: 'GetListAnimePopular',
}

export const productSidebar = {
	templateUrl: '../components/product_section/product_sidebar.html',
}

export const productSidebarComment = {
	templateUrl: '../components/product_section/product_sidebar_comment.html',
}

