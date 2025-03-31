"use client";
import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const FallingBall = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint } =
      Matter;

    // 创建引擎和渲染器
    const engine = Engine.create();
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent"
      }
    });

    // 运行引擎和渲染器
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 创建边界
    const walls = [
      // 地面
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        60,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      ),
      // 左边界
      Bodies.rectangle(
        0,
        window.innerHeight / 2,
        60,
        window.innerHeight + 1000,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      ),
      // 右边界
      Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        60,
        window.innerHeight + 1000,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      ),
      Bodies.rectangle(
        window.innerWidth / 2,
        -300, // 位置稍微往上移，这样不会看到边界
        window.innerWidth,
        20,
        {
          isStatic: true,
          render: { fillStyle: "transparent" }
        }
      )
    ];

    // Step 1: 获取按钮位置
    const button = document.getElementById("action-button");
    const rect = button.getBoundingClientRect();

    // Step 2: 转换为中心点坐标（Matter.js 用中心点定位）
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Step 3: 创建物理墙（不可见）
    const wall = Bodies.rectangle(centerX, centerY, rect.width, rect.height, {
      isStatic: true,
      render: {
        fillStyle: "transparent" // 可选，设置颜色让你看到这面“墙”
      }
    });

    World.add(engine.world, [...walls, wall]);

    // 创建小球
    const balls = [];
    const totalBalls = 20;
    const margin = 200; // 边距

    for (let i = 0; i < totalBalls; i++) {
      const x = margin + Math.random() * (window.innerWidth - 2 * margin);
      const y = -50 - Math.random() * 200; // 随机初始高度

      const ball = Bodies.circle(x, y, 44, {
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.001, // 添加少量空气阻力
        render: {
          sprite: {
            texture: `/images/balls/ball${i + 1}.png`, // 使用编号的图片
            xScale: 0.25,
            yScale: 0.25,
            quality: "high"
          }
        }
      });

      balls.push(ball);
    }

    World.add(engine.world, balls);

    // 添加鼠标控制
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // 添加鼠标悬停效果
    Matter.Events.on(mouseConstraint, "mousemove", function (event) {
      const mousePosition = event.mouse.position;
      const bodies = Matter.Query.point(balls, mousePosition);
      render.canvas.style.cursor = bodies.length ? "grab" : "default";
    });

    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      const mousePosition = event.mouse.position;
      const bodies = Matter.Query.point(balls, mousePosition);
      if (bodies.length) {
        render.canvas.style.cursor = "grabbing";
      }
    });

    Matter.Events.on(mouseConstraint, "mouseup", function () {
      render.canvas.style.cursor = "grab";
    });

    // 清理函数
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default FallingBall;
