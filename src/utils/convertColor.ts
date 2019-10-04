
export enum CssColorTypes {
  RGB = 'RGB',
  RGBA = 'RGBA',
  HSL = 'HSL',
  HSLA = 'HSLA',
  HEX = 'HEX',
}

export function getHSLByRGB(rgb: number[]) {
  const colors = rgb.map((color: number) => color / 255)
  const [red, green, blue] = colors

	const MIN = Math.min(...colors);
  const MAX = Math.max(...colors);
  
  const lightness = (MIN + MAX) / 2;
  
  const delta = MAX - MIN;
  
	let hue: number;
	if (MAX === MIN) {
		hue = 0;
	} else if (red === MAX) {
		hue = (green - blue) / delta;
	} else if (green === MAX) {
		hue = 2 + (blue - red) / delta;
	} else if (blue === MAX) {
		hue = 4 + (red - green) / delta;
	}

	hue = Math.min(hue * 60, 360);

	if (hue < 0) {
		hue += 360;
	}

  
	let saturation: number;
	if (MAX === MIN) {
		saturation = 0;
	} else if (lightness <= 0.5) {
		saturation = delta / (MAX + MIN);
	} else {
		saturation = delta / (2 - (MAX + MIN));
  }

	return [+hue.toFixed(2), +(saturation * 100).toFixed(2), +(lightness * 100).toFixed(2)];
}

export function convertHSLToRGB(hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};



export function getHEXString (colors: number[], alpha = 1) {
  return `#${colors.map((color) => Math.round(255 * (1 - alpha) + color * alpha).toString(16).padStart(2, '0')).join('')}`
}

export function getRGBAString (colors: number[], alpha = 1, withAlpha = false) {
  return `rgb${withAlpha ? 'a' : ''}( ${colors.map((color) => Math.round(255 * (1 - alpha) + color * alpha)).concat(withAlpha ? alpha : []).join(', ')} )`
}

export function getHSLAString(colors: number[], alpha = 1, withAlpha = false) {
  const [hue, saturation, lightness] = getHSLByRGB(colors)

  return `hsl${withAlpha ? 'a' : ''}( ${hue}, ${saturation}%, ${lightness}%${withAlpha ? `, ${alpha}` : ''} )`
}

export function convertColor (conversionType: CssColorTypes, colors: number[], alpha: number = 1) {
  const { HEX, RGB, RGBA, HSL, HSLA } = CssColorTypes

  if (conversionType === HEX) {
    return getHEXString(colors, alpha)
  } else if (conversionType === RGB) {
    return getRGBAString(colors, alpha)
  } else if (conversionType === RGBA) {
    return getRGBAString(colors, alpha, true)
  } else if (conversionType === HSL) {
    return getHSLAString(colors, alpha)
  } else if (conversionType === HSLA) {
    return getHSLAString(colors, alpha, true)
  }
}
