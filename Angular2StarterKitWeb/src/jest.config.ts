import 'jest-preset-angular';
// import './jestGlobalMocks';

const mock = () => {
	return;
};
Object.defineProperty(window, 'CSS', { value: mock() });
Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ['-webkit-appearance']
});
