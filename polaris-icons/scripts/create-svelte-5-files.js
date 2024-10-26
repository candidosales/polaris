import fs from 'fs';

const templateSvelte = `
<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { ICON_SIZES } from '../constants';
	let {
		size = 'md',
		role = 'img',
		ariaLabel = '{{ariaLabel}}',
		class: klass,
		...rest
	}: App.IconProps = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...rest}
    class={twMerge('shrink-0', ICON_SIZES[size], klass)}
    {role}
    aria-label={ariaLabel}
    viewBox="0 0 20 20"
>`;

export function createSvelte5FilesReadFiles(folderPath, files) {
	files.every((file, index) => {
		const fileNameWithoutSVG = file.replace('.svg', '');
		createSvelteFiles(folderPath, file, fileNameWithoutSVG);
		return true;
	});
}

function createSvelteFiles(folderPath, file, fileNameWithoutSVG) {
	fs.readFile(`./icons/${file}`, 'utf8', (err, svgContent) => {
		if (err) {
			console.error('Error reading the SVG file:', err);
		} else {
			console.log('SVG content:\n', svgContent);

			const finalData = replaceTemplate(fileNameWithoutSVG, svgContent)
			console.log('SVG final data:\n', finalData);

			createSvelteFile(folderPath, fileNameWithoutSVG, finalData);
		}
	});
}


function createSvelteFile(folderPath, fileName, content) {
	fs.writeFile(`${folderPath}/${fileName}.svelte`, content, (err, data) => {
		if (err) {
			console.error('Error write the Svelte file:', err);
		} else {
			console.log(`Svelte ${fileName} file created!`);
		}
	})
}

function replaceTemplate(fileName, svgContent) {
	const ariaLabel = createAriaLabel(fileName);
	const data = removeSVGFill(svgContent);
	const templateFinal = replaceAriaLabelTemplate(ariaLabel, templateSvelte);

	if (data.includes('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">')) {
		return data.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">', templateFinal);
	}
	return data.replace('<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">', templateFinal);
}

function replaceAriaLabelTemplate(ariaLabel, template) {
	return template.replace('{{ariaLabel}}', ariaLabel);
}

export function createAriaLabel(fileName) {
	const regex = /Major|Minor/g;
	const nameCleaned = fileName.replace(regex, '');

	const nameParts = nameCleaned.split(/(?=[A-Z])/);
	return nameParts.join(' ').toLowerCase();
}


// Function to remove fill attributes from SVG path strings
function removeSVGFill(svgPath) {
	// This regex matches fill="#XXXXXX" or fill="#XXX" with any hex color
	// It accounts for both 3 and 6 character hex codes
	return svgPath.replace(/\s+fill="#[0-9A-Fa-f]{3,6}"/g, '');
}