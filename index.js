window.addEventListener("load",  () => {
	const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');

	setTimeout(function () {
		birdAnimation();
		rank();
	}, 500);
	setTimeout(function () {
		paralaxMouseInit(paralaxMouse)
	}, 6000);

});
// init ratings
function rank() {
	//check the rating
	const ranks = document.querySelectorAll('.rank');
	if (ranks.length > 0) {
		startRanks();
	}
	// start ratings
	function startRanks() {
		let starsActive, rankValue;
		for (let index = 0; index < ranks.length; index++) {
			const rank = ranks[index];
			startRank(rank);
		}
		// start of the selected rating
		function startRank(rank) {
			setValueVars(rank);
			setStarActive();
			if (rank.classList.contains('rank')) {
				setRank(rank);
			}
		}
		// changing variables
		function setValueVars(rank) {
			starsActive = rank.querySelector('.active');
			rankValue = rank.querySelector('.value');
			rankValue.addEventListener('change', () => setStarActive())
		}
		// changing active stars
		function setStarActive(index = rankValue.value) {
			starsActive.style.width = `${index / 0.05}%`;
		}
		// specify rating 
		function setRank(rank) {
			const rankItems = rank.querySelectorAll('.item');
			for (let index = 0; index < rankItems.length; index++) {
				const rankItem = rankItems[index];
				rankItem.addEventListener("mouseenter", () => {
					setValueVars(rank);
					setStarActive(rankItem.value);
				});
				rankItem.addEventListener("mouseleave", () => {
					setStarActive();
				});
				rankItem.addEventListener("click", () => {
					setValueVars(rank);
					rankValue.value = index + 1;
					setStarActive();
				});
			}
		}
	}
}
// init bird flying after loading
function birdAnimation() {
	const bird = document.querySelector('.bird');
	bird.style.width = '300px';
	bird.style.height = '300px';
	bird.style.transform = "translateX(calc(50vw - 50%))";
	bird.style.transition=" all 5s cubic-bezier(.1,.47,.54,.94)";
}
// init bird paralax with mouth move
 function paralaxMouseInit(paralaxMouse) {
	paralaxMouse.forEach(el => {
		const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

		// coefficient X 
		const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
		// coefficient У 
		const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
		// direction Х
		const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
		// direction У
		const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
		// animation speed
		const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 100;


		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		setMouseParallaxStyle();
		if (paralaxMouseWrapper) {
			mouseMoveParalax(paralaxMouseWrapper);
		} else {
			mouseMoveParalax();
		}

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;
			positionX = positionX + (distX * paramAnimation / 1000);
			positionY = positionY + (distY * paramAnimation / 1000);
			el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
			el.style.width = '300px';
			el.style.height = '300px';
			el.style.left = "calc(50vw - 150px)";
		
			requestAnimationFrame(setMouseParallaxStyle);
		}
		function mouseMoveParalax(wrapper = window) {
			wrapper.addEventListener("mousemove", function (e) {
				const offsetTop = el.getBoundingClientRect().top + window.scrollY;
				if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
					const parallaxWidth = window.innerWidth;
					const parallaxHeight = window.innerHeight;
					const coordX = e.clientX - parallaxWidth / 2;
					const coordY = e.clientY - parallaxHeight / 2;
					coordXprocent = coordX / parallaxWidth * 100;
					coordYprocent = coordY / parallaxHeight * 100;
				}
			});
		}
	});
}
