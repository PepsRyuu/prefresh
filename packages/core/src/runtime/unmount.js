import { options } from 'preact';
import { vnodesForComponent } from './vnodesForComponent';

const oldUnmount = options.unmount;
options.unmount = vnode => {
	const type = (vnode || {}).type;
	if (typeof type === 'function' && vnodesForComponent.has(type)) {
		const vnodes = vnodesForComponent.get(type);
		const index = vnodes.indexOf(vnode);
		if (index !== -1) {
			vnodes.splice(index, 1);
		}
	}
	if (oldUnmount) oldUnmount(vnode);
};
