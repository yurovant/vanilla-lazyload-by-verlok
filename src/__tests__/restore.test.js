import expectExtend from "./lib/expectExtend";
import getFakeInstance from "./lib/getFakeInstance";
import { getExtendedSettings } from "../defaults";

import { setSources } from "../set";
import { restore } from "../restore";

expectExtend(expect);

var outerDiv, settings, instance;

beforeEach(() => {
    outerDiv = document.createElement("div");
    settings = getExtendedSettings();
    instance = getFakeInstance();
});

afterEach(() => {
    outerDiv = null;
    settings = null;
    instance = null;
});

describe("restore for image", () => {
    let img;
    const url1 = "1.gif";
    const url2 = "2.gif";
    const url200 = "200.gif";
    const url400 = "400.gif";
    const sizes100 = "100vw";
    const sizes50 = "50vw";

    beforeEach(() => {
        outerDiv.appendChild((img = document.createElement("img")));
    });

    afterEach(() => {
        outerDiv.removeChild(img);
        img = null;
    });

    test("with initially empty src and srcset", () => {
        img.setAttribute("src", url1);
        img.setAttribute("srcset", url2);
        img.setAttribute("sizes", sizes100);
        img.setAttribute("data-src", url200);
        img.setAttribute("data-srcset", url400);
        img.setAttribute("data-sizes", sizes50);
        setSources(img, settings, instance);
        restore(img);
        expect(img.llOriginalAttrs.src).toBe(url1);
        expect(img.llOriginalAttrs.srcset).toBe(url2);
        expect(img.llOriginalAttrs.sizes).toBe(sizes100);
    });

    //...
});
