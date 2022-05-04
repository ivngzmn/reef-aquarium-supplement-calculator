function MM_findObj(n, d) {
    //v4.01
    var p, i, x;
    if (!d) d = document;
    if ((p = n.indexOf('?')) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++)
        x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n);
    return x;
}
// form validation
function validateForm() {
    //v4.0
    let i,
        p,
        q,
        nm,
        test,
        num,
        min,
        max,
        errors = '',
        args = validateForm.arguments;
    for (i = 0; i < args.length - 2; i += 3) {
        test = args[i + 2];
        val = MM_findObj(args[i]);
        if (val) {
            nm = val.name;
            if ((val = val.value) != '') {
                if (test.indexOf('isEmail') != -1) {
                    p = val.indexOf('@');
                    if (p < 1 || p == val.length - 1)
                        errors +=
                            '- ' + nm + ' must contain an e-mail address.\n';
                } else if (test != 'R') {
                    num = parseFloat(val);
                    if (isNaN(val))
                        errors += '- ' + nm + ' must contain a number.\n';
                    if (test.indexOf('inRange') != -1) {
                        p = test.indexOf(':');
                        min = test.substring(8, p);
                        max = test.substring(p + 1);
                        if (num < min || max < num)
                            errors +=
                                '- ' +
                                nm +
                                ' must contain a number between ' +
                                min +
                                ' and ' +
                                max +
                                '.\n';
                    }
                }
            } else if (test.charAt(0) == 'R')
                errors += '- ' + nm + ' is required.\n';
        }
    }
    if (errors) alert('The following error(s) occurred:\n' + errors);
    document.MM_returnValue = errors == '';
}

document.getElementsByName('Button').onclick(DoCalc);

// Calculator portion of the code
function DoCalc() {
    let volume = parseFloat(document.ChemForm.Volume.value);
    let volType =
        document.ChemForm.VolumeType.options[
            document.ChemForm.VolumeType.selectedIndex
        ].value;
    let CurrCa = parseFloat(document.ChemForm.CurrCa.value);
    let CurrAlk = parseFloat(document.ChemForm.CurrAlk.value);
    let CurrMag = parseInt(document.ChemForm.CurrMag.value);
    let DesCa = parseFloat(document.ChemForm.DesCa.value);
    let DesAlk = parseFloat(document.ChemForm.DesAlk.value);
    let DesMag = parseInt(document.ChemForm.DesMag.value);
    let alktype =
        document.ChemForm.AlkType.options[
            document.ChemForm.AlkType.selectedIndex
        ].value;
    let ProdCa =
        document.ChemForm.CaProductList.options[
            document.ChemForm.CaProductList.selectedIndex
        ].value;
    let ProdAlk =
        document.ChemForm.AlkProductList.options[
            document.ChemForm.AlkProductList.selectedIndex
        ].value;
    let ProdMag =
        document.ChemForm.MagProductList.options[
            document.ChemForm.MagProductList.selectedIndex
        ].value;
    // let xxresult = 0;
    let resultstring = '';
    let cCawarn = '';
    let cCapheffect = '';
    let cAlkpheffect = '';
    let cAlkwarn = '';
    let cMagwarn = '';
    let cMagpheffect = '';
    document.ChemForm.ProdCaReq.value = '';
    document.ChemForm.ProdAlkReq.value = '';
    document.ChemForm.ProdMagReq.value = '';
    document.ChemForm.CaPhEffect.value = '';
    document.ChemForm.AlkPhEffect.value = '';
    document.ChemForm.MagPhEffect.value = '';
    document.ChemForm.CaWarn.value = '';
    document.ChemForm.AlkWarn.value = '';
    document.ChemForm.MagWarn.value = '';
    if (volType == 'l') {
        volume = volume / 3.7854; // convert to gallons
    }
    if (CurrCa > 0) {
        switch (ProdCa) {
            case 'LW':
                // saturated limewater
                result = (10 * (DesCa - CurrCa)) / (813.6795 / volume);
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' US gallons; ' +
                    parseInt(result * 10 * 3.7854) / 100 +
                    ' Liters;  ' +
                    parseInt(result * 128 * 10) / 100 +
                    ' fl oz';
                cCapheffect = 'Substantially higher!';
                cCawarn =
                    'Limewater is not the preferred method to increase Calcium as it will also increase Alkalinity.  It shall be used to maintain levels to match your daily consumption if that is what you entered in your data. Do not dose all at once.  This should be slowly dripped into your aquarium as freshwater topoff.  It is likely that you will need to dose with another additive to make large corrections. Saturated limewater is the clear liquid from mixing 2 tsp kalkwasser(pickling lime) per gallon.';
                break;
            case 'BCAL':
                // Brightwell Aquatics Calcion 1 ml adds 40 ppm/gal
                result = (10 / 40) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'BCARCA':
                // Brightwell Aquatics Reef Code A 1 ml adds 16 ppm/gal
                result = (10 / 16) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This is the calcium part which when used in equal amounts with Reef Code B; the alkalinity part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'BCAN':
                // Brightwell Aquatics Nano Code A 1 ml adds 11.9 ppm/gal
                result = (10 / 11.9) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This is the calcium part which when used in equal amounts with Reef Nano Code B; the alkalinity part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'BCARCAP':
                //Brightwell Aquatics ReefCode A Powder
                // 1 gram adds 87 ppm to 1 gallon water.
                result = 10 * (1 / 87) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'CRBCA':
                // Continuum Reef Basis Calcium 1 ml adds 37.037 ppm/gal
                result = (10 / 37.037) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'CRSA':
                // Continuum Reef Sculpture Part A Calcium 1 ml adds 14.9925 ppm/gal
                result = (10 / 14.9925) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This is the calcium part which when used in equal amounts with Reef Reef Sculpture Part B; the alkalinity part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate alkalinity. Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'CRBCAP':
                //Continuum Reef Basis Calcium Powder
                // 1 gram adds 90.9090 ppm to 1 gallon water.
                result = 10 * (1 / 90.909) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'TMBC':
                // Tropic Marin Bio Calcium 1 ml of Powder adds 28ppm/gal
                result = (10 / 28) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml or;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp (see note below)';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'DO NOT USE FOR INCREASING CALCIUM ONLY. IT IS A BALANCED ADDITIVE, IT WILL ADD 1 meq/lt OF ALKALINITY FOR EVERY 20 PPM OF CALCIUM. Add the powder slowly directly to a high flow area carful not to let it settle. The spoon of the 18 OZ container is 5 ml (or 1 teaspoon) and the one in the 4 and 10 pound containers is 10 ml (or 2 taspoons). It also contains hydrocarbonates so test your alkalinity also, Strontium, Molybdenum and trace elements. Do not dose all at once. Do not increase more than 20 ppm per day which will also increase alkalinity by 1 meq/lt.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'KTECHA':
                // Kent's Tech-CB Calcium Part A 1 ml adds 14.7 ppm/gal
                result = (10 / 14.7) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Cap on 16 oz. bottle equals 5 ml, Cap on 64 oz. and gallon equals 10 ml';
                break;
            case 'CALMAXA':
                // CalxMax Warner Marine Calcium Part A 1 ml adds 15 ppm/gal
                result = (10 / 15) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'WMCC':
                // Concentrate Calcium Warner Marine 1 ml adds 35 ppm/gal
                result = (10 / 35) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'RF1C':
                // Randy's Recipe1 Calcium 1 ml adds 9.77 ppm/gal
                result = (10 / 9.77) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'RF2C':
                // Randy's Recipe2 Calcium 1 ml adds 4.9 ppm/gal
                result = (10 / 4.9) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Do not dose all at once.  Although it may be ok to do so, It is not recommended.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'SCRAC':
                // SeaChem Reef Advantage Calcium  (dry)
                result = 0.019 * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps; ' +
                    parseInt(result * 10) / 20 +
                    ' grms;  ' +
                    parseInt((result * 10) / 28.35) / 20 +
                    ' oz';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This also adds Magnesium and Strontium so check that your addition to correct Calcium will not excessively rise Magnesium. Dissolve it in RO/DI or distilled water before dosing and not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'SCRCA':
                // SeaChem Reef Calcium (liq)
                // in ml
                result = ((DesCa - CurrCa) * volume) / 1.2;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml; ' +
                    parseInt(result / 5) / 10 +
                    ' caps; ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz; ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "IMPORTANT NOTE: This is a Polygluconate-Based Supplement. The manufacturer recommends this product for level maintenance rather than a level correction. For large corrections the use of ionic-based supplement is recommended. Follow the manufacturer's instructions for dosing";
                break;
            case 'SCRCOM':
                // SeaChem Reef Complete (liq)
                // in ml
                result = 0.25 * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml; ' +
                    parseInt(result / 5) / 10 +
                    ' caps; ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz; ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This also adds Magnesium and Strontium so check that your addition to correct Calcium will not excessively rise Magnesium. Do not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'SCRFUS':
                // SeaChem Fusion part 1 (liq)
                // in ml  1 ml adds 26.42 ppm calcium in one gallon
                result = (10 / 26.42) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml; ' +
                    parseInt(result / 5) / 10 +
                    ' caps; ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz; ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'This also adds Magnesium and Strontium and other trace elements so check that your addition to correct Calcium will not excessively rise Magnesium. Do not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'ACACL2':
                // Anhydrous CaCl2 Calclium Chloride (dry)
                // Kent Turbo Calcium
                // Brightwell Aquatics Calcion-P
                // Aq. Systems Reef ESV Calcium Chloride
                // Dow's Peladow
                // Fritz ProAquatics Calcium Chloride
                // in grams & tsp
                // 1 gram adds 95.3968 ppm to 1 gallon water.
                result = 10 * (1 / 95.3968) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  Although it may be ok to do so, Do not increase more than 25 ppm per day.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'FCACL2':
                // Anhydrous CaCl2 Calclium Chloride (dry)
                // Fritz ProAquatics Calcium Chloride
                // in grams & tsp
                // 1 gram adds 95.3968 ppm to 1 gallon water.
                result = 10 * (1 / 95.3968) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'It is recommended to dose in partial increments of 1/3 to 1/2 of the total. Wait 24 hours after first partial dose, check calcium levels, dose another portion. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'AFCA':
                // Aquaforest Calcium (Powder)
                // in grams & tsp
                // 1 gram adds 92.45 ppm to 1 gallon water.
                result = 10 * (1 / 92.45) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'It is recommended to dose in partial increments of 1/3 to 1/2 of the total. Wait 24 hours after first partial dose, check calcium levels, dose another portion. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'DCACL2':
                // CaCl2 Calclium Chloride Dihydrate (dry)
                // Dow's Flake
                // in grams & tsp
                // 1 gram adds 72 ppm to 1 gallon water.
                result = 10 * (1 / 72) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Dissolve it in RO/DI or distilled water before dosing and not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'CBALA':
                // C-Balance Two Little Fishies Part A
                // in ml
                // 1 ml per gallon of aquarium water will raise calcium concentration by 10ppm
                result = 10 * (1 / 10) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Remember that this is Part A of a two part additive. When both parts are added in the same amout, balanced Addition will be made.";
                break;
            case 'MECA':
                // MECoral Calcium
                // in ml
                // 1 ml per gallon of aquarium water will raise calcium concentration by 10ppm
                result = 10 * (1 / 10) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "IMPORTANT: Quart: Use as is as it is already in solution. Gallon: Is shipped concentrated. Before use, add RODI water as per the instructions in the container. Powder: Before use, dissolve in RODI water to prepare the solution as per the instructions. Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'OB1':
                // Oceans Blend Part1 Calcium (Contains Magnesium also)
                // in ml
                // 1 ml per gallon of aquarium water will raise calcium concentration by 10ppm
                result = (10 / 10) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'Warning: Do not dose all at once. Levels should be increased slowly for safety. 1ml per gal per day is the maximum recommendation. Check your levels and then dose another portion. Also note that this Part 1 also adds some amount of Magnesium that shall be taken into consideration so testing for Magnesium is also recomended';
                break;
            case 'BICABUFP2':
                // B-Ionic Calcium Buffer Part 2
                // in ml
                // 1 ml per gallon of aquarium water will raise calcium concentration by 16ppm
                result = 10 * (1 / 16) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'BICASYS2':
                // B-Ionic Calcium Buffer Bicarbonate System Part 2
                // in ml
                // 1 ml per gallon of aquarium water will raise calcium concentration by 4ppm
                result = 10 * (1 / 4) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'KLC':
                // Kent Liquid Calcium
                // Aquaforest Ca Plus (Liquid)
                // in ml > contains 100,000 ppm
                // 1 ml per gallon of aquarium water will raise calcium concentration by 26.42ppm
                result = (1 / 264.1728747) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result * 100) / 10 +
                    ' ml;  ' +
                    parseInt(result * 3.3814) / 10 +
                    ' fl oz;  ' +
                    parseInt((result * 100) / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'RSCA':
                // Red Sea Foundation A Calcium Liquid
                // 1 ml per gallon of aquarium water will raise calcium concentration by 52.831784ppm
                result = (1 / 528.31784) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result * 100) / 10 +
                    ' ml;  ' +
                    parseInt(result * 3.3814) / 10 +
                    ' fl oz;  ' +
                    parseInt((result * 100) / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'RSCAP':
                // Red Sea Foundation A Calcium Powder
                // 1 gram adds 95 ppm to 1 gallon water.
                result = 10 * (1 / 95) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz; approx  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Dissolve it in RO/DI or distilled water before dosing and not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'SCC':
                // Salifert Coral Calcium
                // in ml > contains 160,000 ppm
                // 1 ml per gallon of aquarium water will raise calcium concentration by 42.2654ppm
                result = (1 / 422.67) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result * 100) / 10 +
                    ' ml;  ' +
                    parseInt(result * 3.3814) / 10 +
                    ' fl oz;  ' +
                    parseInt((result * 100) / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    "Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.";
                break;
            case 'SAOC':
                // Salifert All in one
                // contains 50,000 ppm
                // 1 ml per gallon of aquarium water will raise calcium concentration by 13.2079ppm
                result = (1 / 132.079) * (DesCa - CurrCa) * volume;
                resultstring =
                    parseInt(result * 100) / 10 +
                    ' ml;  ' +
                    parseInt(result * 3.3814) / 10 +
                    ' fl oz;  ' +
                    parseInt((result * 100) / 5) / 10 +
                    ' tsp';
                cCapheffect = 'Minimal.';
                cCawarn =
                    'CAUTION: It is designed to be used only to maintain the levels. DO NOT use for making adjustments as it also contains Alkalinity and Aminoacids that can be overdosed if a large adjustment to Calcium is made. Also it is based on Calcium Acetate which, if overdosed could cause a bacterial bloom.';
                break;
            default:
                resultstring = '';
                break;
        } // end switch
        if (result > 0) {
            document.ChemForm.ProdCaReq.value = resultstring;
            // calc the balanced alk
            document.ChemForm.BalAlk.value =
                parseInt(100 * ((DesCa / 40.08 - 9) * 2)) / 100 +
                ' meq/l at ' +
                DesCa +
                ' ppm';
            document.ChemForm.CaPhEffect.value = cCapheffect;
            document.ChemForm.CaWarn.value = cCawarn;
            if (DesAlk == 0) {
                document.ChemForm.DesAlk.value =
                    parseInt(100 * ((DesCa / 40.08 - 9) * 2)) / 100;
            }
        } // end if
    } // CaProd
    resultstring = '';
    if (CurrAlk > 0) {
        if (alktype == 'd') {
            CurrAlk = CurrAlk / 2.8; // convert dKH to meq/l
            DesAlk = DesAlk / 2.8; // convert dKH to meq/l
        }
        if (alktype == 'p') {
            CurrAlk = CurrAlk / 50; // convert ppm to meq/l
            DesAlk = DesAlk / 50; // convert ppm to meq/l
        }
        switch (ProdAlk) {
            case 'LW':
                // saturated limewater
                result = (10 * (DesAlk - CurrAlk)) / (40.68398 / volume);
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' US gallons; ' +
                    parseInt(result * 10 * 3.7854) / 100 +
                    ' Liters;  ' +
                    parseInt(result * 128) / 10 +
                    ' fl oz';
                cAlkpheffect = 'Substantially higher!';
                cAlkwarn =
                    'Limewater is not the preferred method to increase Alkalinity as it will also increase Calcium.  It shall be used to maintain levels to match your daily consumption if that is what you entered in your data. Do not dose all at once.  This should be slowly dripped into your aquarium as freshwater topoff.  It is likely that you will need to dose with another additive to make large corrections. Saturated limewater is the clear liquid from mixing 2 tsp kalkwasser(pickling lime) per gallon.';
                break;
            case 'BAKESODA':
                // baking Soda
                // in grams .318028256 gr=  1meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 1) * 0.318028256 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.7) / 10 +
                    ' tsp, or  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Somewhat lower';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'WASHSODA':
                // Sodium Carbonate or Baked Baking Soda
                // in grams .200617872 gr = 1meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 1) * 0.200617872 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'FBAKESODA':
                // Fritz Sodium Bicarbonate
                // in grams .318028256 gr=  1meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 1) * 0.318028256 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.7) / 10 +
                    ' tsp, or  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Somewhat lower';
                cAlkwarn =
                    'Dissolve appropriate amount in RO / DI water, slowly add to a high flow area, ideally into a sump. Monitor pH while dosing. Avoid immediate impact of pH change to more than +/- 0.2. Re-test and repeat dose until desired level is reached. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'FWASHSODA':
                // Fritz Sodium Carbonate
                // in grams .200617872 gr = 1meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 1) * 0.200617872 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Dissolve appropriate amount in RO / DI water, slowly add to a high flow area, ideally into a sump. Monitor pH while dosing. Avoid immediate impact of pH change to more than +/- 0.2. Re-test and repeat dose until desired level is reached. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'TMBCA':
                // Tropic Marin Bio Calcium
                // in ml & tsp
                //  1 ml of Powder per gallon adds 1.4 meq/lt
                result = 10 * (1 / 1.4) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml or;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp (see note below)';
                cAlkpheffect = 'Minimal';
                cAlkwarn =
                    'DO NOT USE FOR INCREASING ALKALINITY ONLY. IT IS A BALANCED ADDITIVE, IT WILL ADD 20 PPM OF CALCIUM FOR EVERY 1 meq/lt OF ALKALINITY. Add the powder slowly directly to a high flow area carful not to let it settle. The spoon of the 18 OZ container is 5 ml (or 1 teaspoon) and the one in the 4 and 10 pound containers is 10 ml (or 2 taspoons). It also contains Calcium, Strontium, Molybdenum and trace elements. Do not dose all at once. Do not increase more than 1 meq/lt per day which will also increase calcium by 20 ppm.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion.';
                break;
            case 'KTECHB':
                // Kent's Tech CB Part B Alkalinity
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.735 meq/liter (2.06 dKH).
                result = 10 * (1 / 0.735) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium preferably in the morning when the PH is lower. Do not exceed 1/2 ml per gallon per 12 hour period. Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'MEALK':
                // MEcoral Alkalinity
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.7144 meq/liter (2 dKH).
                result = 10 * (1 / 0.714) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'IMPORTANT: Quart: Use as is as it is already in solution. Gallon: Is shipped concentrated. Before use, add RODI water as per the instructions in the container. Powder: Before use, dissolve in RODI water to prepare the solution as per the instructions. Do not dose all at once.  This should be slowly dosed into your aquarium preferably in the morning when the PH is lower. Do not exceed 1/2 ml per gallon per 12 hour period. Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'CALMAXB':
                // Warner Marine CalxMax Part B Alkalinity
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.75 meq/liter (2.1 dKH).
                result = 10 * (1 / 0.75) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Moderate Increase';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'RF1A':
                // Randy's Recipe1 Alk part
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.5 meq/liter (1.4 dKH).
                result = 10 * (1 / 0.5) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Recipe #1 is for use in aquaria where the pH is normal to low. It will have a pH raising effect due to the elevated pH of the alkalinity part, as do most of the commercial two-part additives. The rise that you get will depend on the alkalinity in your aquarium, and, of course, on how much you add. If you add on the order of 0.5 meq/l of alkalinity then the pH will rise about 0.15 to 0.35 pH units immediately upon addition (and higher locally before it has a chance to mix into the whole aquarium). So if you are using limewater (kalkwasser) and the aquarium runs at pH 8.4 or above, this recipe is not the best choice. Otherwise, it is likely to be a good option.';
                break;
            case 'RF2A':
                // Randy's Recipe1 Alk part
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.5 meq/liter (1.4 dKH).
                result = 10 * (1 / 0.25) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Somewhat lower';
                cAlkwarn =
                    'Recipe #2 is for use in aquaria where the pH is on the high side (above 8.3 or so). It will have a very small pH lowering effect when initially added. The drop that you get will depend on the alkalinity in your aquarium, and, of course, on how much you add. If you add on the order of 0.5 meq/l of alkalinity then the pH will drop by about 0.04 pH units immediately upon addition. The pH may later rise if the aquarium is permitted to blow off excess CO2.';
                break;
            case 'OB2':
                // Oceans Blend Part 2 Alkalinity
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.5 meq/liter (1.4 dKh dKH).
                result = 10 * (1 / 0.5) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;   ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Somewhat higher';
                cAlkwarn =
                    'Warning: Do not dose all at once.  Levels should be increased slowly for safety. 1ml per gal per day is the maximum recommendation.';
                break;
            case 'RSKH':
                // Red Sea Foundation B Alkalinity (Liquid))
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.950972 meq/liter (2.663 dKH).
                result = 10 * (1 / 0.950972) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium preferably in the morning when the PH is lower. Do not exceed 1/2 ml per gallon per 12 hour period. Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'RSKHP':
                // Red Sea Foundation B Alkalinity (Powder)
                // in grams 1 gr = 3.16991 meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 3.16991) * volume;
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Dissolve the powder in RO/DI, distilled or purified water before adding it to the aquarium. Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SCRBUF':
                // SeaChem Reef Buffer
                // in tsps
                result = 10 * (DesAlk - CurrAlk) * 0.05 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps; ' +
                    parseInt(result * 10) / 20 +
                    ' grms;  ' +
                    parseInt((result * 10) / 28.35) / 20 +
                    ' oz';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SCRBUI':
                // SeaChem Reef Builder
                // in tsps
                result = 10 * (DesAlk - CurrAlk) * 0.0533333 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps; ' +
                    parseInt(result * 6) / 10 +
                    ' grms;  ' +
                    parseInt((result * 6) / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SCRCARB':
                // SeaChem Reef Carbonate (liq)
                // in ml
                result = 10 * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml; ' +
                    parseInt(result / 5) / 10 +
                    ' caps  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SCRFUS2':
                // SeaChem Fusion part 2 Alk (liq)
                // in ml one ml adds 1.17 meq/gal
                result = (10 / 1.17) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml; ' +
                    parseInt(result / 5) / 10 +
                    ' caps  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20. Manufacturer recommends a maximum dose of 4 ml per 25 liters (0.6 ml per gallon) of system volume.';
                break;
            case 'CBALB':
                // C-Balance Two Little Fishies Part B Alk
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.5 meq/liter (1.4 dKh dKH).
                result = 10 * (1 / 0.5) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'AFKHP':
                // Aquaforest KH Plus (Liquid)
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.2304 meq/liter (0.6451 dKh dKH).
                result = 10 * (1 / 0.23581) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'AFKH':
                // Aquaforest KH Buffer (Powder))
                // in grams .3212 gr=  1meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 1) * 0.3212 * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.7) / 10 +
                    ' tsp, or  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Somewhat lower';
                cAlkwarn =
                    'Dissolve appropriate amount in RO / DI water, slowly add to a high flow area, ideally into a sump. Monitor pH while dosing. Avoid immediate impact of pH change to more than +/- 0.2. Re-test and repeat dose until desired level is reached. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'BICABUFP1':
                // B-Ionic Calcium Buffer Part 1 - Alk
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.74 meq/liter (2.07 dKH).
                result = 10 * (1 / 0.7392857) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Substantially Higher!';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BICASYS1':
                // B-Ionic Bicarbonate System Part 1 - Alk
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.185 meq/liter (2.07 dKH).
                result = 10 * (1 / 0.185) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Somewhat lower';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BALKL':
                // Brightwell's Alkalin8.3 Liquid
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 1.1 meq/liter (3.1 dKH).
                result = 10 * (1 / 1.1) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'Also adds borate alkalinity.  Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BALRCB':
                // Brightwell's Reef Code B Liquid (Alkalinity Part)
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.79 meq/liter (2.22 dKH).
                result = 10 * (1 / 0.79) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'This is the alkalinity part which when used in equal amounts with Reef Code A; the calcium part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Also adds borate alkalinity.  Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BALKP':
                // Brightwell's Alkalin8.3-P Powder
                // in grams 1 gr = 2.43 meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 2.43) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Also adds borate alkalinity.  Dissolve the powder in RO/DI, distilled or purified water before adding it to the aquarium. Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BALN':
                // Brightwell's NanoCode B Liquid
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 1.67 dKh (0.59643)
                result = 10 * (1 / 0.59643) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'This is the alkalinity part which when used in equal amounts with Nano Code A Liquid; the calcium part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Also adds borate alkalinity.  Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'BALRCBP':
                // Brightwell's Reef Code B Powder (Alkalinity Part)
                // in grams 1 gr = 2.96 meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 2.96) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'This is the alkalinity part which when used in equal amounts with Reef Code A powder; the calcium part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Also adds borate alkalinity. Also adds borate alkalinity.  Dissolve the powder in RO/DI, distilled or purified water before adding it to the aquarium. Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'CRBKH':
                // Continuum Reef Basis KH Buffer (Liquid)
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 1 meq/liter (2.8 dKh dKH).
                result = 10 * (1 / 1) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'CRBKHP':
                // Continuum Borate Free KH Buffer (Powder)
                // in grams 1 gr = 3.125 meq/lt in 1 gal
                result = 10 * ((DesAlk - CurrAlk) / 3.125) * volume;
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' grams, approx ' +
                    parseInt(result / 4.6) / 10 +
                    ' tsp, or ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Higher!';
                cAlkwarn =
                    'Dissolve the powder in RO/DI, distilled or purified water before adding it to the aquarium. Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'CRSB':
                // Continuum Reef Sculpture Part B Liquid (Alkalinity Part)
                // in ml
                // 1 ml per gallon of aquarium water will raise alkalinity by 0.79 meq/liter (2.22 dKH)
                result = 10 * (1 / 0.79) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'This is the alkalinity part which when used in equal amounts with Reef Sculpture Part A; the calcium part, will be ionically-balanced with respect to natural seawater concentrations of calcium and carbonate. Also adds borate alkalinity.  Do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'ASRESB':
                //  Aquarium Systems reef evolution seabuffer
                // in tsp
                // 0.1 tsp per gallon of aquarium water will raise alkalinity by 2.0 meq/liter (5.6 dKH).
                result = 10 * (0.1 / 2) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps, approx ' +
                    parseInt(result * 5) / 10 +
                    ' grams, or ' +
                    parseInt((result * 5) / 28.35) / 10 +
                    ' oz';
                cAlkpheffect = 'Substantially Higher';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SALB':
                //  Salifert KH + PH Buffer
                // in tsp
                // 2 teaspoons (10 ml) per 25 gal incr alk by 1.4 meq/lt  (0.1 tsp / gal=1.5 meq/lt)
                result = 10 * (0.1 / 1.5) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps ' +
                    parseInt(result * 5) / 10 +
                    ' ml of powder ';
                cAlkpheffect = 'Higher';
                cAlkwarn =
                    'Dissolve it in RO/DI or distilled water before dosing and do not dose all at once.  This should be slowly dosed into your aquarium.  Monitor pH while dosing.  Do not allow immediate impact of pH to be more than +/-0.20.';
                break;
            case 'SAOA':
                //  Salifert All in One
                // in ml
                // 1 ml incr alk by 0.660395 meq/lt in one gal
                result = 10 * (1 / 0.660395) * (DesAlk - CurrAlk) * volume;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsps ';
                cAlkpheffect = 'Minimal';
                cAlkwarn =
                    'CAUTION: It is designed to be used only to maintain the levels. DO NOT use for making adjustments as it also contains Calcium and Aminoacids that can be overdosed if a large adjustment to Alkalinity is made. Also it is based on Calcium Acetate which, if overdosed could cause a bacterial bloom.';
                break;
            default:
                resultstring = '';
        }
        if (result > 0) {
            // calc the balanced Calcium
            document.ChemForm.BalCa.value =
                parseInt((9 + DesAlk / 2) * 40.08) +
                ' ppm at ' +
                parseInt(100 * DesAlk) / 100 +
                ' meq/l';
            document.ChemForm.ProdAlkReq.value = resultstring;
            document.ChemForm.AlkPhEffect.value = cAlkpheffect;
            document.ChemForm.AlkWarn.value = cAlkwarn;
            if (DesCa == 0) {
                document.ChemForm.DesCa.value = parseInt(
                    (9 + DesAlk / 2) * 40.08
                );
            }
        }
    } // AlkPord
    resultstring = '';
    if (CurrMag > 0) {
        switch (ProdMag) {
            case 'ES':
                // Epsom Salts Magnesium Sulfate Heptahydrate
                result = (10 * (DesMag - CurrMag) * volume) / 26.78;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    "Dissolve it in RO / DI water and add it to a high flow area, better if in a sump. The first time add a small portion and make sure there isn't any problem before adding the remainder. Long term use may affect ionic balance if no water changes are made. Limit the increase to a Max. of 100 ppm/Day";
                break;
            case 'FES':
                // Fritz Magnesium Sulfate Heptahydrate
                result = (10 * (DesMag - CurrMag) * volume) / 26.78;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve required amount in RO / DI water and slowly add to a high flow area, ideally into a sump. Re-test and repeat dose until desired level is reached. Fritz ProAquatics Mag Sulfate can be used in conjunction with Fritz ProAquatics Mag Flake to more closely match the natural ratio of seawater. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'MCH':
                // Magnesium Chloride Hexahydrate (MagFlake))
                result = (10 * (DesMag - CurrMag) * volume) / 31.6875;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz  ' +
                    parseInt(result / 0.84 / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    "Dissolve it in RO / DI water and add it to a high flow area, better if in a sump. The first time add a small portion and make sure there isn't any problem before adding the remainder. Long term use may affect ionic balance if no water changes are made. Limit the increase to a Max. of 100 ppm/Day";
                break;
            case 'FMCH':
                // Fritz Mag Flake
                // Aquaforest Magnesium (Powder)
                result = (10 * (DesMag - CurrMag) * volume) / 30.86133;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz  ' +
                    parseInt(result / 0.84 / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve required amount in RO / DI water and slowly add to a high flow area, ideally into sump. Re-test and repeat dose until desired level is reached. Conversion between volume and weight of powdered products are approximate; as a precaution, dose less than the calculated amount and measure the effect before adding the total amount.';
                break;
            case 'MCA':
                // Magnesium Chloride Anhydrous
                result = (10 * (DesMag - CurrMag) * volume) / 65.871;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    "Dissolve it in RO / DI water and add it to a high flow area, better if in a sump. The first time add a small portion and make sure there isn't any problem before adding the remainder. Long term use may affect ionic balance if no water changes are made. Limit the increase to a Max. of 100 ppm/Day";
                break;
            case 'WMCMAG':
                // Warner Marine Balanced Magnesium (liquid)
                // one ml per gallon will increase Magnesium by 21 ppm
                result = ((DesMag - CurrMag) * volume * 10) / 21;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'RFM':
                // Randy's Recipes 1 & 2 one ml will increase 12.4 ppm in 1 gallon
                result = (10 * (DesMag - CurrMag) * volume) / 12.4;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    "You can add it all at once or over time as you choose, depending on the aquarium size and set up. Add it to a high flow area, preferably in a sump. In a very small aquarium, or one without a sump, it is suggested to add it slowly; especially the first time you do so to make sure that corals don't get blasted with locally high concentrations of magnesium, sulfate, or any impurities in your Epsom Salts. The first time, you might add a small portion and make sure there isn't any problem before proceeding to add the remainder. NOTE: Part 1 3A and 3B and Part 2 3A and 3B all have the same Magnesium content of 47,000 ppm so for a given required increase in Magnesium the amount to add is the same for all of them although the parts A will add Sulphate and Chloride to better match NSW proportions while the parts B will only add Sulphate. It is recommended to keep regular water changes specially if you use part B";
                break;
            case 'BAML':
                // Brightwell Aquatics Magnesion (liquid)
                // one ml per gallon will increase Magnesium by 26 ppm
                result = ((DesMag - CurrMag) * volume * 10) / 26;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use. Do not dose all at once, dose 1/3 to 1/2 and the next day test. Check your levels and then dose another portion. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'BAMP':
                // Brightwell Aquatics Magnesion-P (Powder)
                // one g per gallon will increase Magnesium by 64 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 64;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz  ' +
                    parseInt(result / 0.84 / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve it in RO / DI water. Do not dose all at once or at the same time of Ca or Alk additives.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'CRBM':
                // Continuum Reef Basis Magnesium (liquid)
                // one ml per gallon will increase Magnesium by 18.761726 ppm
                result = ((DesMag - CurrMag) * volume * 10) / 18.761726;
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'CRBMP':
                // Continuum Reef Basis Magnesium (Powder)
                // One g per gallon will increase Magnesium by 65.871 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 111.11;
                resultstring =
                    parseInt(result * 10) / 100 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz  ' +
                    parseInt(result / 0.84 / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'IMPORTANT NOTE: The calculation of the amount to add is based on the manufacturer reference calculations and this amount although safe, may not be enough to increase your level as desired. You may find that you need up to 70% more product to achieve them. Dissolve it in RO / DI water. Do not dose all at once or at the same time of Ca or Alk additives.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'KNTC':
                // Kent Tech M (liquid) (See Warning)
                // This is for the concentration that provides 18.4 ppm/ml/gal
                result = (10 * (DesMag - CurrMag) * volume) / 18.49;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    "WARNING: Seems that there could be two concentrations of this product, check the instructions in the bottle. If it mentions 1 ml per gallon will rise MG by 39.1 ppm USE HALF of the calculated dose and test again after 24 Hrs. Shake vigorously imediately before use. Do not dose all at once.  Although it may be ok to do so, I don't recommend it.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day";
                break;
            case 'ESVM':
                // B-Ionic Magnessium
                //1.5 ml per gallon increase by 15 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 10;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use and add it to a high flow area, Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'AFMGP':
                // Aquaforest Mg Plus (liquid)
                //1 ml per gallon increase by 19.817 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 19.817;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use and add it to a high flow area, Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'OBM':
                // Oceans Blend Magnesium (liquid)
                // one ml per gallon will increase Magnesium by 15 ppm
                result = ((DesMag - CurrMag) * volume * 10) / 15;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'RSM':
                // Red Sea Foundation C Magnesium (liquid)
                //1 ml per gallon increase by 26.415892 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 26.415892;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use and add it to a high flow area, Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'RSMP':
                // Red Sea Foundation C (Powder)
                // one g per gallon will increase Magnesium by 35.397295 ppm
                result = (10 * (DesMag - CurrMag) * volume) / 35.397295;
                resultstring =
                    parseInt(result) / 10 +
                    ' grams;  ' +
                    parseInt(result / 28.35) / 10 +
                    ' oz  ' +
                    parseInt(result / 0.84 / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve it in RO / DI water. Do not dose all at once or at the same time of Ca or Alk additives.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'MEM':
                // MECoral Magnesium (liquid)
                // one ml per gallon will increase Magnesium by 12.5 ppm
                result = ((DesMag - CurrMag) * volume * 10) / 12.5;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'IMPORTANT: Quart: Use as is as it is already in solution. Gallon: Is shipped concentrated. Before use, add RODI water as per the instructions in the container. Powder: Before use, dissolve in RODI water to prepare the solution as per the instructions. Shake well before use. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'TMBM':
                // Tropic Marin Bio-Magnesium (Dry)
                result = (10 * (DesMag - CurrMag) * volume) / 150;
                resultstring = parseInt(result) / 10 + ' tsps';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'WARNING: The calculator assumes you will be using a kitchen teaspoon or the 5 ml measuring spoon that comes with the smaller packages of this product. Larger Packages come with  10 ml measuring spoon. If you will be using the larger measuring spoon, reduce the recommended amount to ONE HALF. Dissolve it in RO / DI water. Do not dose all at once.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day.';
                break;
            case 'SQRM':
                // Seaquem Reef Advantage Magnessium
                result = (9.5 * (DesMag - CurrMag) * volume) / 100;
                resultstring =
                    parseInt(result) / 10 +
                    ' tsps; ' +
                    parseInt(result * 10) / 20 +
                    ' grms;  ' +
                    parseInt((result * 10) / 28.35) / 20 +
                    ' oz';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve it in RO / DI water. Do not dose all at once or at the same time of Ca or Alk additives.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            case 'SLM':
                // Salifert Liquid Magnesium
                // one ml per gallon will increase Magnesium by 6.6039725 ppm
                result = (DesMag - CurrMag) * volume * 10 * 0.1514161;
                resultstring =
                    parseInt(result) / 10 +
                    ' ml;  ' +
                    parseInt(result * 0.033814) / 10 +
                    ' fl oz;  ' +
                    parseInt(result / 5) / 10 +
                    ' tsp';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Warning: Shake well before use. Do not increase Magnesium level more than 100 ppm in a 24 hour period. Test 24 hours after dosage.';
                break;
            case 'SMP':
                // Salifert Magnesium Powder
                // 30 ml of powder increase 100 liters by 30 ppm (1 ml/gal = 26.42 ppm)
                result = ((DesMag - CurrMag) * volume * 10) / 26.4172;
                resultstring =
                    parseInt(result / 5) / 10 +
                    ' tsps; ' +
                    parseInt(result) / 10 +
                    ' ml of Powder; ';
                cMagpheffect = 'Largely unchanged';
                cMagwarn =
                    'Dissolve it in RO / DI water. Do not dose all at once or at the same time of Ca or Alk additives.  Dose 1/3 to 1/2 and the next day test.  Check your levels and then dose another portion. Limit the increase to a Max. of 100 ppm/Day';
                break;
            default:
                resultstring = '';
                break;
        } // end switch
        if (result > 0) {
            document.ChemForm.ProdMagReq.value = resultstring;
            document.ChemForm.MagPhEffect.value = cMagpheffect;
            document.ChemForm.MagWarn.value = cMagwarn;
            if (DesMag == 0) {
                document.ChemForm.DesMag.value =
                    parseInt(DesMag / 3) + ' ppm Ca at ' + DesMag + ' ppm Mg';
            }
        } // end if
    } // MgProd
    resultstring = '';
    return 0;
}
