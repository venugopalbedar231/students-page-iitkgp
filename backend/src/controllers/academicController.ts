import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

export async function getAcademicResources(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query;

    const where = category && typeof category === 'string' && category.toLowerCase() !== 'all'
      ? { category: category.toLowerCase() }
      : {};

    const resources = await prisma.academicResource.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
        { id: 'asc' },
      ],
    });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAcademicResourceById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid resource ID' });
      return;
    }

    const resource = await prisma.academicResource.findUnique({
      where: { id },
    });

    if (!resource) {
      res.status(404).json({ success: false, message: 'Academic resource not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAcademicResource(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, title, description, link, icon, order } = req.body;

    if (!category || !title || !description || !link) {
      res.status(400).json({
        success: false,
        message: 'Category, title, description, and link are required',
      });
      return;
    }

    const resource = await prisma.academicResource.create({
      data: {
        category: category.toLowerCase().trim(),
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
        icon: icon ? icon.trim() : 'fas fa-link',
        order: typeof order === 'number' ? order : parseInt(order, 10) || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Academic resource created successfully',
      data: resource,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAcademicResource(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid resource ID' });
      return;
    }

    const existing = await prisma.academicResource.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Academic resource not found' });
      return;
    }

    const { category, title, description, link, icon, order } = req.body;

    const updated = await prisma.academicResource.update({
      where: { id },
      data: {
        ...(category && { category: category.toLowerCase().trim() }),
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }),
        ...(link && { link: link.trim() }),
        ...(icon !== undefined && { icon: icon ? icon.trim() : 'fas fa-link' }),
        ...(order !== undefined && { order: typeof order === 'number' ? order : parseInt(order, 10) || 0 }),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Academic resource updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAcademicResource(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid resource ID' });
      return;
    }

    const existing = await prisma.academicResource.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Academic resource not found' });
      return;
    }

    await prisma.academicResource.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Academic resource deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}