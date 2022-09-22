import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import './style.less';

const Test: React.FC = () => {
    const ref: MutableRefObject<any> = useRef(null);

    useEffect(() => {
        let renderer: THREE.WebGLRenderer;
        let camera: THREE.PerspectiveCamera;
        function resize() {
            // camera.aspect = window.innerWidth / window.innerHeight;
            // camera.updateProjectionMatrix();
            renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
        }
        if (ref.current) {
            camera = new THREE.PerspectiveCamera(
                70,
                ref.current.clientWidth / ref.current.clientHeight,
                0.01,
                10,
            );
            camera.position.z = 10;

            // camera.position.z = 2;
            // camera.position.set(0, 1, 2);
            camera.lookAt(0, 0, 0);

            const scene = new THREE.Scene();

            const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const material = new THREE.MeshNormalMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const planeGeometry = new THREE.PlaneGeometry(1, 1);
            const planeMaterial = new THREE.MeshNormalMaterial();
            const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
            scene.add(planeMesh);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
            renderer.setAnimationLoop(animation);

            ref.current.appendChild(renderer.domElement);

            /* 轨迹球控件 */
            const controls = new TrackballControls(camera, renderer.domElement);
            // /* 属性参数 */
            // controls.rotateSpeed = 0.2; // 旋转速度
            // controls.zoomSpeed = 0.2; // 缩放速度
            // // controls.panSpeed = 0.1; // 平controls

            // controls.staticMoving = false; // 静止移动，为 true 则没有惯性
            // controls.dynamicDampingFactor = 0.2; // 阻尼系数 越小 则滑动越大

            // controls.minDistance = 50; // 最小视角
            // controls.maxDistance = 350; // 最大视角 Infinity 无穷大

            // animation
            function animation() {
                // function animation(time:any) {
                // planeMesh.rotation.x = time / 2000;
                // planeMesh.rotation.y = time / 1000;
                controls.update();
                renderer.render(scene, camera);
            }

            window.addEventListener('resize', resize, false);
        }
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <PageContainer>
            <Card>
                第一个demo
                <div className="canvasContainer" ref={ref} />
            </Card>
        </PageContainer>
    );
};

export default Test;
