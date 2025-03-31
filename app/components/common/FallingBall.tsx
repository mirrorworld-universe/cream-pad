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

    World.add(engine.world, walls);

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
