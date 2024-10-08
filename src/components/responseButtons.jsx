import { buttons, buttonsMobile } from "../utils/constantsMusical.js";
import Button from "./buttonBase.jsx";
import { memo, useEffect, useState, useRef } from "react";

export const ResponseButtonsMemo = memo(function ResponseButtons({ callback = () => {}, containerRef }) {
	let buttonList = [];

	const prevWidth = useRef(window.innerWidth);
	const [buttonData, setButtonData] = useState(window.innerWidth <= 600 ? buttonsMobile : buttons);

	useEffect(() => {
		const handleResize = () => {
			const currWidth = window.innerWidth;
			if (currWidth <= 600 && prevWidth.current > 600) {
				setButtonData(buttonsMobile);
			} else if (currWidth > 600 && prevWidth.current <= 600) {
				setButtonData(buttons);
			}
			prevWidth.current = currWidth;
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	buttonData.forEach((button, index) => {
		if (Array.isArray(button)) {
			let text = button.join(";");
			console.log(buttons[index]);
			buttonList.push(
				<Button
					key={index}
					handleClick={(e) => {
						callback(e);
					}}
					dataValue={buttons[index]}
					double={true}
					text={text}
					type='response'
				></Button>
			);
		} else
			buttonList.push(
				<Button
					key={index}
					double={false}
					handleClick={(e) => {
						callback(e);
					}}
					dataValue={buttons[index].toLowerCase()}
					text={button}
					type='response'
				></Button>
			);
	});

	return (
		<div ref={containerRef} className='button-container'>
			{buttonList}
		</div>
	);
});
