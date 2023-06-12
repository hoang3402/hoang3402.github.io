import {app} from '../js/main.js';
app.component('productItem', {
	templateUrl: '../components/product_section/product_item.html',
	bindings: {
		id: '@',
		name: '@',
		url: '@',
		comment: '@',
		views: '@',
		genres: '<',
	},
});
app.component('viewItem', {
	templateUrl: '../components/anime_top_views/view_item.html',
	bindings: {
		id: '@',
		name: '@',
		url: '@',
		views: '@',
	},
});
app.component('headerCustoms', {
	templateUrl: '../components/header/header.html',
	controller: 'GetGenres',
	bindings: {
		name: '@',
		url: '@',
	},
});
app.component('heroSlider', {
	templateUrl: '../components/hero_slider/hero_slider.html',
	bindings: {
		name: '@',
		url: '@',
	},
});
app.component('productSection', {
	templateUrl: '../components/product_section/product_section.html',
});
app.component('animeDetailsEpisode', {
	templateUrl:
		'../components/anime__details__episodes/anime_details_episodes.html',
	bindings: {
		listEp: '@',
	},
});
app.component('footerCustoms', {
	templateUrl: '../components/footer/footer.html',
});
app.component('search', {
	templateUrl: '../components/search/search.html',
});
app.component('breadcrumb', {
	templateUrl: '../components/breadcrumb/breadcrumb.html',
});
app.component('animeDetailsContent', {
	templateUrl: '../components/anime_details_content/anime_details_content.html',
});
app.component('animeTopViews', {
	templateUrl: '../components/anime_top_views/anime_top_views.html',
});
app.component('heroItem', {
	templateUrl: '../components/hero_slider/hero_items.html',
	bindings: {
		idMovie: '@',
		name: '@',
		linkImage: '@',
		description: '@',
	},
});
app.component('trendingProduct', {
	templateUrl: '../components/product_section/trending_product.html',
	controller: 'GetListAnimeTrending',
});
app.component('liveProduct', {
	templateUrl: '../components/product_section/live_product.html',
});
app.component('recentProduct', {
	templateUrl: '../components/product_section/recent_product.html',
});
app.component('popularProduct', {
	templateUrl: '../components/product_section/popular_product.html',
	controller: 'GetListAnimePopular',
});
app.component('productSidebar', {
	templateUrl: '../components/product_section/product_sidebar.html',
});
app.component('productSidebarComment', {
	templateUrl: '../components/product_section/product_sidebar_comment.html',
});
