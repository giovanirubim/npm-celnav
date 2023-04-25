import Trig from "@giovanirubim/trig";

const earthRadius = 6371.0088e3;
const refractedRadius = earthRadius*7/6;

export default class CelNav {
	constructor(trig = new Trig(1)) {
		this.trig = trig;
	}
	refraction(apparentAlt, temperatureC = 10, pressureMb = 1010) {
		const { trig } = this;
		const ha = trig.toDeg(apparentAlt);
		const arcmins = 1/trig.tan(
			trig.fromDeg(ha + 7.31/(ha + 4.4))
		);
		const degrees = arcmins/60;
		const m1 = pressureMb/1010;
		const m2 = 283/(temperatureC + 273);
		return trig.fromDeg(degrees)*m1*m2;
	}
	dip(heightMeters) {
		const { trig } = this;
		const h = heightMeters;
		const r = refractedRadius;
		const cos = r/(h + r);
		return trig.acos(cos);
	}
	parallax(alt, distanceMeters) {
		const { trig } = this;
		const sin = trig.cos(alt)*(earthRadius/distanceMeters);
		return trig.asin(sin);
	}
}
